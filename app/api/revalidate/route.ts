import {revalidatePath, revalidateTag} from 'next/cache'
import {NextRequest} from 'next/server'

/**
 * On-demand revalidation.
 *
 * ### Notes
 * Because Next.js has such aggressive caching,
 * we need to invalidate the following items:
 *
 * 1. The path/slug to the SSG page.
 * 2. The cached GraphQL query for the page.
 * 3. The cached GraphQL query for _all_ fetches.
 *
 * ### Important
 * This route _must_ be a GET request!
 *
 * ### Usage
 *
 * Send a GET request (with secret header) to:
 * `/api/revalidate?slug=foo-bar-baz`
 *
 * ### References
 * @see https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#on-demand-revalidation
 * @see https://nextjs.org/docs/app/api-reference/functions/revalidateTag
 * @see https://nextjs.org/docs/app/api-reference/functions/revalidatePath
 */

/**
 * Rate limiting configuration.
 *
 * WARNING: This in-memory Map will NOT work correctly in production
 * serverless environments (Vercel, AWS Lambda, etc.) where each request
 * may run on a different instance. For production, use:
 * - Redis (Upstash Redis recommended for serverless)
 * - Vercel KV
 * - Other distributed cache solutions
 */
const rateLimitMap = new Map<string, number[]>()
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10 // requests per window

export async function GET(request: NextRequest) {
  const secret = request.headers.get('x-revalidation-secret')
  const slug = request.nextUrl.searchParams.get('slug')
  const ip = request.headers.get('x-forwarded-for') || 'unknown'

  // Rate limiting check
  const now = Date.now()
  const requests = rateLimitMap.get(ip) || []
  const recentRequests = requests.filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS
  )

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return new Response(
      JSON.stringify({revalidated: false, message: 'Rate limit exceeded'}),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-Robots-Tag': 'noindex',
          'Retry-After': '60'
        }
      }
    )
  }

  recentRequests.push(now)
  rateLimitMap.set(ip, recentRequests)

  // Validate the secret.
  if (!secret || secret !== process.env.NEXTJS_REVALIDATION_SECRET) {
    return new Response(
      JSON.stringify({revalidated: false, message: 'Invalid secret'}),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
          'X-Robots-Tag': 'noindex'
        }
      }
    )
  }

  // Validate the post slug (prevent path traversal and injection)
  if (!slug || !/^[a-zA-Z0-9-_/]+$/.test(slug)) {
    return new Response(
      JSON.stringify({revalidated: false, message: 'Invalid slug parameter.'}),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'X-Robots-Tag': 'noindex'
        }
      }
    )
  }

  try {
    // Revalidate the static page.
    revalidatePath(slug, 'page')

    // Revalidate the layout.
    revalidatePath('/', 'layout')

    // Revalidate everything.
    revalidatePath('/')

    // Revalidate the cached GraphQL queries.
    revalidateTag(slug, 'max')
    revalidateTag('graphql', 'max') // This tag is set in `lib/functions.ts`.

    return new Response(
      JSON.stringify({
        revalidated: true,
        revalidatePath: slug,
        revalidateTags: [slug, 'graphql'],
        revalidationTime: Date.now()
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Robots-Tag': 'noindex'
        }
      }
    )
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error.'

    return new Response(
      JSON.stringify({
        revalidated: false,
        revalidatePath: slug,
        revalidateTag: 'graphql',
        revalidationTime: Date.now(),
        error: errorMessage
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'X-Robots-Tag': 'noindex'
        }
      }
    )
  }
}
