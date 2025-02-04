import config from '@/lib/config'
import type {MetadataRoute} from 'next'

/**
 * Generate robots.txt.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots#generate-a-robots-file
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: `${config.siteUrl}/sitemap.xml`
  }
}
