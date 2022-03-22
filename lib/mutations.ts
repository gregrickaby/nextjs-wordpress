import {gql} from '@apollo/client'

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
