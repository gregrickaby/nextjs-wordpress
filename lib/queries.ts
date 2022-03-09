import {gql} from '@apollo/client'
import {FEATURED_IMAGE} from '~/lib/fragments'

export const GET_ALL_PAGES = gql`
  query AllPagesQuery {
    pages {
      nodes {
        slug
      }
    }
  }
`

export const SINGLE_PAGE_QUERY = gql`
  ${FEATURED_IMAGE}
  query PageQuery($slug: ID!) {
    page(id: $slug, idType: URI) {
      title(format: RENDERED)
      content(format: RENDERED)
      featuredImage {
        ...FeaturedImageFields
      }
    }
  }
`

export const GET_ALL_BOOKS = gql`
  query AllBooksQuery {
    books {
      nodes {
        slug
      }
    }
  }
`

export const SINGLE_BOOK_QUERY = gql`
  ${FEATURED_IMAGE}
  query BookQuery($slug: ID!) {
    book(id: $slug, idType: URI) {
      affiliateLink
      title
      description
      featuredImage {
        ...FeaturedImageFields
      }
    }
  }
`
