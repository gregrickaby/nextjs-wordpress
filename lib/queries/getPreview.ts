import {fetchGraphQL} from '@/lib/functions'
import {Post} from '@/lib/types'

/**
 * Fetch a preview post.
 */
export default async function getPreview(id: string) {
  const query = `
    query PreviewPost($id: ID!) {
      post(id: $id, idType: DATABASE_ID, asPreview: true) {
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
        tags {
          nodes {
            databaseId
            name
          }
        }
        categories {
          nodes {
            databaseId
            name
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
    id: id
  }

  const response = await fetchGraphQL(query, variables, true)

  return response.data.post as Post
}
