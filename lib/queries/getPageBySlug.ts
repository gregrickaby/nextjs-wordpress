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
        date
        modified
        content(format: RENDERED)
        title(format: RENDERED)
        featuredImage {
          node {
            altText
            sourceUrl
            mediaDetails {
                height
                width
            }
          }
        }
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
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
