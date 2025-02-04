import config from '@/lib/config'
import getAllPages from '@/lib/queries/getAllPages'
import getAllPosts from '@/lib/queries/getAllPosts'
import type {Page, Post} from '@/lib/types'
import {MetadataRoute} from 'next'

/**
 * Generate sitemap entries from WordPress pages and posts.
 */
function generateWPEntries(
  items: Post[] | Page[],
  urlPrefix: string
): MetadataRoute.Sitemap {
  return items.map((item) => ({
    url: `${config.siteUrl}${urlPrefix}${item.slug}`,
    changeFrequency: 'monthly',
    priority: 0.5
  }))
}

/**
 * Generate sitemap for the website.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#generating-a-sitemap-using-code-js-ts
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Fetch all posts and pages
    const allPosts = await getAllPosts()
    const allPages = await getAllPages()

    // Generate sitemap entries.
    const posts = generateWPEntries(allPosts, '/blog/')
    const pages = generateWPEntries(allPages, '/')

    // Combine posts and pages.
    const sitemap = [...pages, ...posts]

    // Create sitemap.xml
    return sitemap
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return []
  }
}
