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

  return response.data.book as Book
}
