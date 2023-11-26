import {fetchGraphQL} from '@/lib/functions'
import {Page} from '@/lib/types'

/**
 * Fetch a page by slug.
 */
export default async function getPageBySlug(slug: string) {
  const query = `
    query GetPageBySlug($slug: ID = "URI") {
      page(idType: URI, id: $slug) {
        databaseId
        content(format: RENDERED)
        title(format: RENDERED)
        featuredImage {
          node {
            altText
            mediaDetails {
              sizes(include: MEDIUM) {
                height
                width
                sourceUrl
              }
            }
          }
        }
        author {
          node {
            gravatarUrl
            name
          }
        }
        date
        seo {
          metaDesc
          title
        }
      }
    }
  `

  const variables = {
    slug: slug
  }

  const response = await fetchGraphQL(query, variables)

  return response.data.page as Page
}
