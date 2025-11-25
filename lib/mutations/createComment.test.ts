import {createComment} from '@/lib/mutations/createComment'
import {server} from '@/test-utils'
import {http, HttpResponse} from 'msw'

describe('createComment', () => {
  const mockCommentData = {
    name: 'Test User',
    email: 'test@example.com',
    website: 'https://example.com',
    comment: 'This is a test comment',
    postID: '1'
  }

  it('should create a comment successfully', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json({
          data: {
            createComment: {
              success: true,
              comment: {
                author: {
                  node: {
                    name: 'Test User',
                    email: 'test@example.com',
                    url: 'https://example.com',
                    avatar: {
                      url: 'https://example.com/avatar.jpg'
                    }
                  }
                },
                content: '<p>This is a test comment</p>',
                date: '2024-01-01T00:00:00'
              }
            }
          }
        })
      })
    )

    const result = await createComment(mockCommentData)

    expect(result.success).toBe(true)
    expect(result.comment.author.node.name).toBe('Test User')
    expect(result.comment.author.node.email).toBe('test@example.com')
    expect(result.comment.content).toBe('<p>This is a test comment</p>')
  })

  it('should handle comment creation without website URL', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json({
          data: {
            createComment: {
              success: true,
              comment: {
                author: {
                  node: {
                    name: 'Test User',
                    email: 'test@example.com',
                    url: null,
                    avatar: {
                      url: 'https://example.com/avatar.jpg'
                    }
                  }
                },
                content: '<p>Comment without website</p>',
                date: '2024-01-01T00:00:00'
              }
            }
          }
        })
      })
    )

    const result = await createComment({
      ...mockCommentData,
      website: ''
    })

    expect(result.success).toBe(true)
  })

  it('should handle API errors gracefully', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json(
          {
            errors: [
              {
                message: 'Comment creation failed'
              }
            ]
          },
          {status: 400}
        )
      })
    )

    await expect(createComment(mockCommentData)).rejects.toThrow()
  })

  it('should handle network errors', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return new HttpResponse(null, {status: 500})
      })
    )

    await expect(createComment(mockCommentData)).rejects.toThrow()
  })

  it('should pass correct variables to GraphQL mutation', async () => {
    server.use(
      http.post(
        `${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`,
        async ({request}) => {
          const body = (await request.json()) as {
            variables: {
              authorName: string
              authorEmail: string
              authorUrl: string
              comment: string
              postID: string
            }
          }

          expect(body.variables.authorName).toBe('Test User')
          expect(body.variables.authorEmail).toBe('test@example.com')
          expect(body.variables.authorUrl).toBe('https://example.com')
          expect(body.variables.comment).toBe('This is a test comment')
          expect(body.variables.postID).toBe('1')

          return HttpResponse.json({
            data: {
              createComment: {
                success: true,
                comment: {
                  author: {
                    node: {
                      name: 'Test User',
                      email: 'test@example.com',
                      url: 'https://example.com',
                      avatar: {
                        url: 'https://example.com/avatar.jpg'
                      }
                    }
                  },
                  content: '<p>This is a test comment</p>',
                  date: '2024-01-01T00:00:00'
                }
              }
            }
          })
        }
      )
    )

    await createComment(mockCommentData)
  })
})
