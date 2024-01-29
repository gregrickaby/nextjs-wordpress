import config from '@/lib/config'
import getAllPages from '@/lib/queries/getAllPages'
import getAllPosts from '@/lib/queries/getAllPosts'

/**
 * Route segment config.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
 */
export const runtime = 'edge'

/**
 * Route handler for generating sitemap.xml.
 *
 * @see https://www.sitemaps.org/protocol.html
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/route
 */
export async function GET() {
  // Fetch all posts and pages
  const allPosts = await getAllPosts()
  const allPages = await getAllPages()

  // Start sitemap XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

  // Add all pages to sitemap
  allPages.forEach((page) => {
    xml += `
  <url>
    <loc>${config.siteUrl}/${page.slug}</loc>
    <lastmod>${new Date(page.date).toISOString()}</lastmod>
  </url>`
  })

  // Add blog posts to sitemap
  allPosts.forEach((post) => {
    xml += `
  <url>
    <loc>${config.siteUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.date).toISOString()}</lastmod>
  </url>`
  })

  // Close urlset tag
  xml += `</urlset>`

  // Return response
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  })
}
