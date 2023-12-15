import {fetchGraphQL} from '@/lib/functions'
import {Page} from '@/lib/types'

/**
 * Fetch all pages.
 */
export default async function getAllPages() {
  const query = `
    query GetAllPages {
      pages(where: {status: PUBLISH}) {
        nodes {
          content(format: RENDERED)
          databaseId
          date
          modified
          excerpt(format: RENDERED)
          slug
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
          seo {
            metaDesc
            title
          }
        }
      }
    }
  `

  const response = await fetchGraphQL(query)

  return response.data.pages.nodes as Page[]
}
