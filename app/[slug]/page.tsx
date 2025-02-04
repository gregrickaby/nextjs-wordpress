import getAllBooks from '@/lib/queries/getAllBooks'
import getAllPosts from '@/lib/queries/getAllPosts'
import getPageBySlug from '@/lib/queries/getPageBySlug'
import type {DynamicPageProps} from '@/lib/types'
import {Page, Post} from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import {notFound} from 'next/navigation'

/**
 * Fetches data from WordPress.
 */
async function fetchData(slug: string) {
  // If the slug is 'blog', fetch all posts.
  if (slug === 'blog') {
    return {posts: await getAllPosts(), context: 'blog'}
  }

  // If the slug is 'books', fetch all books.
  if (slug === 'books') {
    return {posts: await getAllBooks(), context: 'books'}
  }

  // Otherwise, this could be a page.
  const page = await getPageBySlug(slug)

  // If page data exists, return it.
  if (page) {
    return {post: page}
  }

  // Otherwise, return an error.
  return {error: 'No data found'}
}

/**
 * Render a single page.
 */
function RenderPage({page}: {page: Page}) {
  return (
    <main className="flex flex-col gap-8">
      <article>
        <h1 dangerouslySetInnerHTML={{__html: page.title}} />
        <div dangerouslySetInnerHTML={{__html: page.content}} />
      </article>
    </main>
  )
}

/**
 * Render posts list.
 */
function RenderPostsList({posts, context}: {posts: Post[]; context: string}) {
  return (
    <main className="flex flex-col gap-8">
      <h1 className="capitalize">Latest {context}</h1>
      <div className="flex flex-wrap gap-8">
        {posts.map((post: Post) => (
          <article className="w-72" key={post.databaseId}>
            <Image
              alt={post.featuredImage.node.altText}
              height={233}
              src={post.featuredImage.node.sourceUrl}
              width={280}
              priority={true}
            />
            <Link href={`/${context}/${post.slug}`}>
              <h2 dangerouslySetInnerHTML={{__html: post.title}} />
            </Link>
            <p className="text-sm text-gray-500">
              {post.commentCount} Comments
            </p>
            <div dangerouslySetInnerHTML={{__html: post.excerpt}} />
            <Link className="button" href={`/${context}/${post.slug}`}>
              View Post
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}

/**
 * Catch-all Archive Page route.
 */
export default async function Archive({params}: Readonly<DynamicPageProps>) {
  // Get the slug from the params.
  const {slug} = await params

  // Fetch data from WordPress.
  const data = await fetchData(slug)

  // If there's an error, return a 404 page.
  if (data.error) {
    notFound()
  }

  // If this is a single page, render the page.
  if (data.post) {
    return <RenderPage page={data.post} />
  }

  // Otherwise, this must be an archive. Render the posts list.
  if (data.posts && data.posts.length > 0) {
    return <RenderPostsList posts={data.posts} context={data.context} />
  }

  // Otherwise, return a 404 page.
  notFound()
}
