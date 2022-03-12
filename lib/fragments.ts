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
