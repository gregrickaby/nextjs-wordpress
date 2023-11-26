import {fetchGraphQL} from '@/lib/functions'
import {Post} from '@/lib/types'

/**
 * Fetch all books.
 */
export default async function getAllBooks() {
  const query = `
    query GetAllBooks {
      books(where: {status: PUBLISH}) {
        nodes {
          databaseId
          title
          slug
          excerpt(format: RENDERED)
          featuredImage {
            node {
              altText
              mediaDetails {
                sizes {
                  height
                  width
                  sourceUrl
                }
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

  return response.data.books.nodes as Post[]
}
