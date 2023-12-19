import {fetchGraphQL} from '@/lib/functions'
import {Post} from '@/lib/types'

/**
 * Fetch a category archive by slug.
 */
export default async function getCategoryBySlug(
  slug: string,
  limit: number = 10
) {
  const query = `
    query GetCategoryBySlug($slug: String!) {
      posts(where: {categoryName: $slug, status: PUBLISH}, first: ${limit}) {
        nodes {
          databaseId
          date
          excerpt(format: RENDERED)
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
          seo {
            metaDesc
            title
          }
          slug
        }
      }
    }
  `

  const variables = {
    slug: slug
  }

  const response = await fetchGraphQL(query, variables)

  return response.data.posts.nodes as Post[]
}
