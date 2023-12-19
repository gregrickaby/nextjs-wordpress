import {fetchGraphQL} from '@/lib/functions'
import {Post} from '@/lib/types'

/**
 * Fetch a tag archive by slug.
 */
export default async function getTagBySlug(slug: string, limit: number = 10) {
  const query = `
    query GetTagBySlug($slug: String!) {
      posts(where: {tag: $slug, status: PUBLISH}, first: ${limit}) {
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
