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
export async function GET(request: NextRequest) {
  const secret = request.headers.get('x-vercel-revalidation-secret')
  const slug = request.nextUrl.searchParams.get('slug')

  // Validate the secret.
  if (secret !== process.env.NEXTJS_REVALIDATION_SECRET) {
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

  // Validate the post slug.
  if (!slug) {
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
    revalidateTag(slug)
    revalidateTag('graphql') // This tag is set in `lib/functions.ts`.

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
