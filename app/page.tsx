import {getAllPosts} from '@/lib/functions'
import {Post} from '@/lib/types'
import {Metadata} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {notFound} from 'next/navigation'

export const revalidate = 3600
export const metadata: Metadata = {
  title: 'Next.js WordPress',
  description: "It's headless WordPress"
}

/**
 * The homepage component.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
 */
export default async function Home() {
  // Fetch posts from WordPress.
  const posts = await getAllPosts()

  // No posts? Bail...
  if (!posts) {
    notFound()
  }

  return (
    <main className="flex flex-col items-start justify-center gap-8 md:flex-row">
      {posts.map((post: Post) => (
        <article className="w-72" key={post.databaseId}>
          <Image
            alt={post.featuredImage.node.altText}
            height={post.featuredImage.node.mediaDetails.sizes[0].height}
            src={post.featuredImage.node.mediaDetails.sizes[0].sourceUrl}
            width={post.featuredImage.node.mediaDetails.sizes[0].width}
            priority={true}
          />
          <h2 dangerouslySetInnerHTML={{__html: post.title}} />
          <p className="text-sm text-gray-500">{post.commentCount} Comments</p>
          <div dangerouslySetInnerHTML={{__html: post.excerpt}} />
          <Link className="button" href={`/${post.slug}`}>
            View Post
          </Link>
        </article>
      ))}
    </main>
  )
}
