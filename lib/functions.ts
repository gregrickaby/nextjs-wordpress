import {Post} from './types'

/**
 * Server-side function to fetch a single blog post.
 */
export async function getAllPosts() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
          query GetAllPosts {
            posts {
              nodes {
                commentCount
                databaseId
                title
                slug
                excerpt(format: RENDERED)
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
              }
            }
          }
      `
      })
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const posts = await response.json()

    if (posts === null) {
      throw new Error('Post not found')
    }

    return posts.data.posts.nodes as Post[]
  } catch (error) {
    console.error(error)
  }
}

/**
 * Server-side function to fetch a single blog post.
 */
export async function getPost(slug: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
          query GetPost($slug: ID!) {
            post(id: $slug, idType: SLUG) {
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
              author {
                node {
                  gravatarUrl
                  name
                }
              }
              date
              tags {
                nodes {
                  databaseId
                  name
                }
              }
              categories {
                nodes {
                  databaseId
                  name
                }
              }
              seo {
                metaDesc
                title
              }
              comments(first: 10, where: {order: ASC}) {
                nodes {
                  content(format: RENDERED)
                  databaseId
                  date
                  status
                  author {
                    node {
                      email
                      gravatarUrl
                      name
                    }
                  }
                }
              }
            }
          }
      `,
        variables: {
          slug: slug
        }
      })
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const post = await response.json()

    if (post === null) {
      throw new Error('Post not found!')
    }

    return post.data.post as Post
  } catch (error) {
    console.error(error)
  }
}

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
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
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
      `,
        variables: {
          authorEmail: comment.email,
          authorName: comment.name,
          authorUrl: comment.website,
          comment: comment.comment,
          postID: comment.postID
        }
      })
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const status = await response.json()

    if (status.errors) {
      return {
        success: false,
        message: status.errors[0].message
      }
    }

    return {
      success: true,
      message: status.data
    }
  } catch (error) {
    console.error(error)
  }
}
