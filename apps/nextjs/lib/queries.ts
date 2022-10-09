import {gql} from '@apollo/client'

export const GENERAL_FRAGMENT = gql`
  fragment Settings on GeneralSettings {
    dateFormat
    description
    language
    timeFormat
    title
  }
`

export const MENU_FRAGMENT = gql`
  fragment MenuItems on Menu {
    menuItems {
      nodes {
        path
        target
        label
      }
    }
  }
`

export const FEATURED_IMAGE_FRAGMENT = gql`
  fragment FeaturedImageFields on NodeWithFeaturedImageToMediaItemConnectionEdge {
    node {
      altText
      sourceUrl(size: LARGE)
      mediaDetails {
        height
        width
      }
    }
  }
`

export const COMMENTS_FRAGMENT = gql`
  fragment CommentFields on PostToCommentConnection {
    nodes {
      author {
        node {
          gravatarUrl
          name
          url
        }
      }
      approved
      content(format: RENDERED)
      databaseId
      date
      parentId
    }
  }
`

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
    headerMenu: menu(id: "Header", idType: NAME) {
      ...MenuItems
    }
    footerMenu: menu(id: "Footer", idType: NAME) {
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
        title
        metaDesc
      }
    }
  }
`

export const SINGLE_POST_QUERY = gql`
  ${COMMENTS_FRAGMENT}
  ${FEATURED_IMAGE_FRAGMENT}
  ${GENERAL_FRAGMENT}
  ${MENU_FRAGMENT}
  query SinglePostQuery($slug: ID!) {
    generalSettings {
      ...Settings
    }
    headerMenu: menu(id: "Header", idType: NAME) {
      ...MenuItems
    }
    footerMenu: menu(id: "Footer", idType: NAME) {
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
      uri
      featuredImage {
        ...FeaturedImageFields
      }
      postFields {
        reactions {
          like
          dislike
          love
        }
      }
      seo {
        fullHead
        title
        metaDesc
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
  query SingleBookQuery($slug: ID!) {
    generalSettings {
      ...Settings
    }
    footerMenu: menu(id: "Header", idType: NAME) {
      ...MenuItems
    }
    footerMenu: menu(id: "Footer", idType: NAME) {
      ...FooterMenuItems
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
        title
        metaDesc
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
  query PostArchiveQuery($category: String!) {
    generalSettings {
      ...Settings
    }
    headerMenu: menu(id: "Header", idType: NAME) {
      ...MenuItems
    }
    footerMenu: menu(id: "Footer", idType: NAME) {
      ...MenuItems
    }
    posts(where: {categoryName: $category}) {
      nodes {
        title(format: RENDERED)
        excerpt(format: RENDERED)
        uri
        featuredImage {
          ...FeaturedImageFields
        }
        categories {
          edges {
            node {
              name
              uri
            }
          }
        }
        seo {
          fullHead
          title
          metaDesc
        }
      }
    }
  }
`

export const BOOKS_ARCHIVE_QUERY = gql`
  ${FEATURED_IMAGE_FRAGMENT}
  ${GENERAL_FRAGMENT}
  ${MENU_FRAGMENT}
  query BookArchiveQuery {
    generalSettings {
      ...Settings
    }
    headerMenu: menu(id: "Header", idType: NAME) {
      ...MenuItems
    }
    footerMenu: menu(id: "Footer", idType: NAME) {
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
          title
          metaDesc
        }
      }
    }
  }
`

export const CREATE_COMMENT = gql`
  mutation CREATE_COMMENT(
    $authorEmail: String!
    $authorName: String!
    $authorUrl: String
    $comment: String!
    $postID: Int!
  ) {
    createComment(
      input: {
        author: $authorName
        authorEmail: $authorEmail
        authorUrl: $authorUrl
        commentOn: $postID
        content: $comment
      }
    ) {
      success
      comment {
        author {
          node {
            email
            gravatarUrl
            name
            url
          }
        }
        content(format: RENDERED)
        date
      }
    }
  }
`
