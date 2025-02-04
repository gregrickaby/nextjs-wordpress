import {headers} from 'next/headers'

/**
 * Not Found component.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/not-found
 */
export default async function NotFound() {
  // Get the referer header.
  const headersList = await headers()

  // Get the referer header value.
  const referer = headersList.get('referer')

  return (
    <>
      <h1 className="text-center">404 - Not Found</h1>
      <p className="text-center text-red-500">{referer}</p>
    </>
  )
}
