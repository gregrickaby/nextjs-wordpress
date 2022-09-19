import {gql} from '@apollo/client'
import {
  COMMENTS_FRAGMENT,
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
    books {
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
    menu(id: "Header", idType: NAME) {
      ...MenuItems
    }
    page(id: $slug, idType: URI) {
      title(format: RENDERED)
      content(format: RENDERED)
      databaseId
      uri
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
  ${COMMENTS_FRAGMENT}
  ${FEATURED_IMAGE_FRAGMENT}
  ${GENERAL_FRAGMENT}
  ${MENU_FRAGMENT}
  query SinglePageQuery($slug: ID!) {
    generalSettings {
      ...Settings
    }
    menu(id: "Header", idType: NAME) {
      ...MenuItems
    }
    post(id: $slug, idType: URI) {
      author {
        node {
          gravatarUrl
          name
        }
      }
      categories {
        edges {
          node {
            name
            uri
          }
        }
      }
      commentCount
      commentStatus
      comments(first: 100, where: {order: ASC}) {
        ...CommentFields
      }
      content(format: RENDERED)
      contentType {
        node {
          name
        }
      }
      date
      databaseId
      hearts {
        hearts
      }
      uri
      featuredImage {
        ...FeaturedImageFields
      }
      seo {
        fullHead
      }
      tags {
        edges {
          node {
            name
            uri
          }
        }
      }
      title(format: RENDERED)
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
    menu(id: "Header", idType: NAME) {
      ...MenuItems
    }
    book(id: $slug, idType: URI) {
      title(format: RENDERED)
      content(format: RENDERED)
      databaseId
      uri
      featuredImage {
        ...FeaturedImageFields
      }
      seo {
        fullHead
      }
      bookFields {
        affiliateUrl
        isbn
      }
    }
  }
`

export const POSTS_ARCHIVE_QUERY = gql`
  ${FEATURED_IMAGE_FRAGMENT}
  ${GENERAL_FRAGMENT}
  ${MENU_FRAGMENT}
  query PostArchiveQuery {
    generalSettings {
      ...Settings
    }
    menu(id: "Header", idType: NAME) {
      ...MenuItems
    }
    posts {
      nodes {
        title(format: RENDERED)
        excerpt(format: RENDERED)
        uri
        featuredImage {
          ...FeaturedImageFields
        }
      }
    }
  }
`

export const BOOKS_ARCHIVE_QUERY = gql`
  ${FEATURED_IMAGE_FRAGMENT}
  ${GENERAL_FRAGMENT}
  ${MENU_FRAGMENT}
  query PostArchiveQuery {
    generalSettings {
      ...Settings
    }
    menu(id: "Header", idType: NAME) {
      ...MenuItems
    }
    books {
      nodes {
        slug
        title(format: RENDERED)
        content(format: RENDERED)
        uri
        featuredImage {
          ...FeaturedImageFields
        }
        seo {
          fullHead
        }
      }
    }
  }
`
