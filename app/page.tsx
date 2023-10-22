import getAllPosts from '@/lib/api/queries/getAllPosts'
import getPageBySlug from '@/lib/api/queries/getPageBySlug'
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
 * The homepage route.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
 */
export default async function Home() {
  // Fetch homepage from WordPress.
  const homepage = await getPageBySlug('homepage')

  // Fetch posts from WordPress.
  const posts = await getAllPosts()

  // No data? Bail...
  if (!posts || !posts.length || !homepage) {
    notFound()
  }

  return (
    <main className="flex flex-col gap-8">
      <article>
        <h1 dangerouslySetInnerHTML={{__html: homepage.title}} />
        <div dangerouslySetInnerHTML={{__html: homepage.content}} />
      </article>

      <aside>
        <h2>Latest Posts</h2>
        <div className="flex flex-wrap gap-8">
          {posts.map((post: Post) => (
            <article className="w-72" key={post.databaseId}>
              <Image
                alt={post.featuredImage.node.altText}
                height={post.featuredImage.node.mediaDetails.sizes[0].height}
                src={post.featuredImage.node.mediaDetails.sizes[0].sourceUrl}
                width={post.featuredImage.node.mediaDetails.sizes[0].width}
                priority={true}
              />
              <Link href={`/blog/${post.slug}`}>
                <h2 dangerouslySetInnerHTML={{__html: post.title}} />
              </Link>
              <p className="text-sm text-gray-500">
                {post.commentCount} Comments
              </p>
              <div dangerouslySetInnerHTML={{__html: post.excerpt}} />
              <Link className="button" href={`/blog/${post.slug}`}>
                View Post
              </Link>
            </article>
          ))}
        </div>
      </aside>
    </main>
  )
}
