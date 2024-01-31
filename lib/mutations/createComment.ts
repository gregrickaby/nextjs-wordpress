import {fetchGraphQL} from '@/lib/functions'

/**
 * Create a comment.
 */
export async function createComment(comment: {
  name: string
  email: string
  website: string
  comment: string
  postID: string
}) {
  const query = `
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
              avatar {
                url
              }
              email
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

  const variables = {
    authorEmail: comment.email,
    authorName: comment.name,
    authorUrl: comment.website,
    comment: comment.comment,
    postID: comment.postID
  }

  const response = await fetchGraphQL(query, variables)

  return response.data.createComment
}
