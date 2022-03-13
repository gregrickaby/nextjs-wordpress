import {gql} from '@apollo/client'
import {
  FEATURED_IMAGE_FRAGMENT,
  GENERAL_FRAGMENT,
  MENU_FRAGMENT
} from '~/lib/fragments'

export const GET_ALL_PAGES = gql`
  query AllPagesQuery {
    pages {
      nodes {
        slug
      }
    }
  }
`

export const GET_ALL_POSTS = gql`
  query AllPostsQuery {
    posts {
      nodes {
        uri
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

export const SINGLE_PAGE_QUERY = gql`
  ${FEATURED_IMAGE_FRAGMENT}
  ${GENERAL_FRAGMENT}
  ${MENU_FRAGMENT}
  query SinglePageQuery($slug: ID!) {
    generalSettings {
      ...Settings
    }
    menu(id: "PRIMARY", idType: NAME) {
      ...MenuItems
    }
    page(id: $slug, idType: URI) {
      title(format: RENDERED)
      content(format: RENDERED)
      featuredImage {
        ...FeaturedImageFields
      }
      seo {
        fullHead
      }
    }
  }
`

export const SINGLE_POST_QUERY = gql`
  ${FEATURED_IMAGE_FRAGMENT}
  ${GENERAL_FRAGMENT}
  ${MENU_FRAGMENT}
  query SinglePageQuery($slug: ID!) {
    generalSettings {
      ...Settings
    }
    menu(id: "PRIMARY", idType: NAME) {
      ...MenuItems
    }
    post(id: $slug, idType: URI) {
      title(format: RENDERED)
      content(format: RENDERED)
      featuredImage {
        ...FeaturedImageFields
      }
      seo {
        fullHead
      }
    }
  }
`

export const SINGLE_BOOK_QUERY = gql`
  ${FEATURED_IMAGE_FRAGMENT}
  ${GENERAL_FRAGMENT}
  ${MENU_FRAGMENT}
  query BookQuery($slug: ID!) {
    generalSettings {
      ...Settings
    }
    menu(id: "PRIMARY", idType: NAME) {
      ...MenuItems
    }
    book(id: $slug, idType: URI) {
      affiliateLink
      title
      description
      featuredImage {
        ...FeaturedImageFields
      }
      seo {
        fullHead
      }
    }
  }
`

export const POSTS_ARCHIVE_QUERY = gql`
  ${FEATURED_IMAGE_FRAGMENT}
  ${GENERAL_FRAGMENT}
  ${MENU_FRAGMENT}
  query PostArchiveQuery($slug: ID!) {
    generalSettings {
      ...Settings
    }
    menu(id: "PRIMARY", idType: NAME) {
      ...MenuItems
    }
    page(id: $slug, idType: URI) {
      seo {
        fullHead
      }
    }
    posts {
      nodes {
        title(format: RENDERED)
        excerpt(format: RENDERED)
        date
        uri
        featuredImage {
          ...FeaturedImageFields
        }
      }
    }
  }
`
