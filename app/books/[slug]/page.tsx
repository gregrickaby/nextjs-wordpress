import getAllBooks from '@/lib/queries/getAllBooks'
import getBookBySlug from '@/lib/queries/getBookBySlug'
import type {DynamicPageProps} from '@/lib/types'
import {Metadata} from 'next'
import Link from 'next/link'
import {notFound} from 'next/navigation'

/**
 * Generate the static routes at build time.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  // Get a list of all books.
  const books = await getAllBooks()

  // No books? Bail...
  if (!books) {
    return []
  }

  // Return the slugs for each book.
  return books.map((book: {slug: string}) => ({
    slug: book.slug
  }))
}

/**
 * Generate the metadata for each static route at build time.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata({
  params
}: Readonly<DynamicPageProps>): Promise<Metadata | null> {
  // Get the slug from the params.
  const {slug} = await params

  // Get the page.
  const book = await getBookBySlug(slug)

  // No post? Bail...
  if (!book) {
    return {}
  }

  return {
    title: book.seo.title,
    description: book.seo.metaDesc
  }
}

/**
 * A single book route.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
 */
export default async function Book({params}: Readonly<DynamicPageProps>) {
  // Get the slug from the params.
  const {slug} = await params

  // Fetch a single book from WordPress.
  const book = await getBookBySlug(slug)

  // No book? Bail...
  if (!book) {
    notFound()
  }

  return (
    <main className="flex flex-col gap-8">
      <article className="w-full">
        <h1 dangerouslySetInnerHTML={{__html: book.title}} />
        <div dangerouslySetInnerHTML={{__html: book.content}} />
        <Link className="button" href={book.bookFields.affiliateUrl}>
          View on Amazon
        </Link>
      </article>
    </main>
  )
}
