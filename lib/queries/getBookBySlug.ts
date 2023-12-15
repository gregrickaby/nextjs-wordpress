import {fetchGraphQL} from '@/lib/functions'
import {Book} from '@/lib/types'

/**
 * Fetch a book by slug.
 */
export default async function getBookBySlug(slug: string) {
  const query = `
    query GetBookBySlug($slug: ID = "URI") {
      book(idType: SLUG, id: $slug) {
        bookFields {
          affiliateUrl
          isbn
        }
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

  return response.data.book as Book
}
