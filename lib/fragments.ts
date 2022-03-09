import {gql} from '@apollo/client'

export const FEATURED_IMAGE = gql`
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
