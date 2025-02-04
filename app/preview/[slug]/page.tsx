import config from '@/lib/config'
import getPreview from '@/lib/queries/getPreview'
import type {DynamicPageProps} from '@/lib/types'
import {Metadata} from 'next'

interface PreviewProps {
  params: Promise<{slug: string}>
  searchParams: Promise<{[key: string]: string | string[] | undefined}>
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

  // Get the preview post.
  const post = await getPreview(slug)

  // No preview? Bail...
  if (!post) {
    return {}
  }

  return {
    title: `${post.title} - ${config.siteName}`,
    description: post.excerpt,
    robots: 'noindex',
    openGraph: {
      title: `${post.title} - ${config.siteName}`,
      description: post.excerpt,
      url: `${config.siteUrl}/blog/${slug}`,
      siteName: config.siteName,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: post?.featuredImage?.node?.sourceUrl,
          width: post?.featuredImage?.node?.mediaDetails?.width,
          height: post?.featuredImage?.node?.mediaDetails?.height,
          alt: post?.featuredImage?.node?.altText
        }
      ]
    }
  }
}

/**
 * Preview route.
 *
 * This route is used to preview posts before they are published.
 * It must contain the secret key in the query parameters.
 *
 * @usage https://example.com/preview/123456?secret=secret-key
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
 */
export default async function Preview({
  params,
  searchParams
}: Readonly<PreviewProps>) {
  // Get the slug from the params.
  const {slug} = await params

  // Get the secret from the query parameters.
  const {secret} = await searchParams

  // No secret? Bail.
  if (!secret || secret !== process.env.NEXTJS_PREVIEW_SECRET) {
    return (
      <div className="container mx-auto text-center">
        <h1>This page requires a preview secret.</h1>
        <p>
          Please verify the secret has been set in both the environment variable
          (.env) and wp-config.php files and the secret is passed as a query
          parameter.
        </p>
      </div>
    )
  }

  // Attempt to get the preview.
  const post = await getPreview(slug)

  // No preview available? Bail.
  if (!post) {
    return (
      <div className="container mx-auto text-center">
        <h1>Preview Error</h1>
        <p>
          Couldn&apos;t find a WordPress post with the Post ID:{' '}
          <span className="bg-yellow-200 p-1 font-mono text-black">{slug}</span>
        </p>
        <p>Please verify the Post ID and try again.</p>
      </div>
    )
  }

  return (
    <article>
      <header>
        <h2 dangerouslySetInnerHTML={{__html: post.title}} />
        <p className="italic">
          By {post.author.node.name} on <time>{post.date}</time>
        </p>
      </header>
      <div dangerouslySetInnerHTML={{__html: post.content}} />
      <footer className="flex items-center justify-between gap-4 pb-4">
        <div>
          <h3>Categories</h3>
          <ul className="m-0 flex list-none gap-2 p-0">
            {post.categories.nodes.map((category) => (
              <li className="m-0 p-0" key={category.databaseId}>
                {category.name}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Tags</h3>
          <ul className="m-0 flex list-none gap-2 p-0">
            {post.tags.nodes.map((tag) => (
              <li className="m-0 p-0" key={tag.databaseId}>
                {tag.name}
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </article>
  )
}
