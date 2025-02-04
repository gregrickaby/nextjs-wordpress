import config from '@/lib/config'
import getAllPosts from '@/lib/queries/getAllPosts'
import escape from 'xml-escape'

/**
 * Route handler for generating RSS feed.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/route
 */
export async function GET() {
  // Fetch all posts.
  const allPosts = await getAllPosts()

  // If no posts, return response.
  if (!allPosts) {
    return new Response('No posts found.', {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8'
      }
    })
  }

  // Start of RSS feed.
  let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${config.siteName}</title>
    <description>${config.siteDescription}</description>
    <link>${config.siteUrl}</link>
    <generator>RSS for Node and Next.js</generator>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <ttl>60</ttl>`

  // Add posts to RSS feed.
  allPosts.forEach((post) => {
    rss += `
    <item>
      <title>${escape(post.title)}</title>
      <description>${escape(post.excerpt)}</description>
      <link>${config.siteUrl}/blog/${post.slug}</link>
      <guid>${config.siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
  })

  // Close channel and rss tag.
  rss += `
  </channel>
</rss>`

  // Return response.
  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  })
}
