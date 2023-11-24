import {fetchGraphQL} from '@/lib/functions'
import {Post} from '@/lib/types'

/**
 * Fetch all blog posts.
 */
export default async function getAllPosts() {
  const query = `
    query GetAllPosts {
      posts(where: {status: PUBLISH}) {
        nodes {
          commentCount
          databaseId
          title
          slug
          excerpt(format: RENDERED)
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
        }
      }
    }
  `

  const response = await fetchGraphQL(query)

  return response.data.posts.nodes as Post[]
}
