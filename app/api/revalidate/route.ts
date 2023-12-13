import {revalidateTag} from 'next/cache'

/**
 * On-demand revalidation endpoint.
 *
 * @see https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#on-demand-revalidation
 */
export async function POST(request: Request) {
  const requestHeaders = new Headers(request.headers)
  const secret = requestHeaders.get('x-vercel-revalidation-secret')

  if (secret !== process.env.NEXTJS_REVALIDATION_SECRET) {
    return Response.json({message: 'Invalid secret'}, {status: 401})
  }

  revalidateTag('posts')

  return Response.json({revalidated: true, now: Date.now()})
}
