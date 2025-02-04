import config from '@/lib/config'
import getCategoryBySlug from '@/lib/queries/getCategoryBySlug'
import {DynamicPageProps} from '@/lib/types'
import {Metadata} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {notFound} from 'next/navigation'

/**
 * Generate the metadata for each static route at build time.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata({
  params
}: DynamicPageProps): Promise<Metadata | null> {
  // Get the slug from the params.
  const {slug} = await params

  return {
    title: `${slug} Archives - ${config.siteName}`,
    description: `The category archive for ${slug}`
  }
}

/**
 * The category archive route.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
 */
export default async function CategoryArchive({
  params
}: Readonly<DynamicPageProps>) {
  // Get the slug from the params.
  const {slug} = await params

  // Fetch posts from WordPress.
  const posts = await getCategoryBySlug(slug)

  // No posts? Bail...
  if (!posts) {
    notFound()
  }

  return (
    <main className="flex flex-col gap-8">
      <h1 className="capitalize">Post Category: {slug}</h1>
      <div className="flex flex-wrap gap-8">
        {posts.map((post) => (
          <article className="w-72" key={post.databaseId}>
            <Image
              alt={post.featuredImage.node.altText}
              height={post.featuredImage.node.mediaDetails.height}
              src={post.featuredImage.node.sourceUrl}
              width={post.featuredImage.node.mediaDetails.width}
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
    </main>
  )
}
