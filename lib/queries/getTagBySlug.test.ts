import getTagBySlug from '@/lib/queries/getTagBySlug'
import {server} from '@/test-utils'
import {http, HttpResponse} from 'msw'

describe('getTagBySlug', () => {
  it('should fetch posts by tag slug successfully', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json({
          data: {
            posts: {
              nodes: [
                {
                  databaseId: 1,
                  title: 'Tagged Post 1',
                  slug: 'tagged-post-1',
                  excerpt: 'Test excerpt 1',
                  date: '2024-01-01T00:00:00',
                  featuredImage: null,
                  seo: {
                    metaDesc: 'Test description',
                    title: 'Tagged Post 1'
                  }
                },
                {
                  databaseId: 2,
                  title: 'Tagged Post 2',
                  slug: 'tagged-post-2',
                  excerpt: 'Test excerpt 2',
                  date: '2024-01-02T00:00:00',
                  featuredImage: null,
                  seo: {
                    metaDesc: 'Test description 2',
                    title: 'Tagged Post 2'
                  }
                }
              ]
            }
          }
        })
      })
    )

    const posts = await getTagBySlug('test-tag')

    expect(posts).toHaveLength(2)
    expect(posts[0].title).toBe('Tagged Post 1')
    expect(posts[1].title).toBe('Tagged Post 2')
  })

  it('should handle custom limit parameter', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json({
          data: {
            posts: {
              nodes: [
                {
                  databaseId: 1,
                  title: 'Tagged Post 1',
                  slug: 'tagged-post-1',
                  excerpt: 'Test excerpt 1',
                  date: '2024-01-01T00:00:00',
                  featuredImage: null,
                  seo: {
                    metaDesc: 'Test description',
                    title: 'Tagged Post 1'
                  }
                }
              ]
            }
          }
        })
      })
    )

    const posts = await getTagBySlug('test-tag', 5)

    expect(posts).toHaveLength(1)
  })

  it('should handle API errors gracefully', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json(
          {
            errors: [{message: 'Internal server error'}]
          },
          {status: 500}
        )
      })
    )

    await expect(getTagBySlug('error-tag')).rejects.toThrow()
  })

  it('should use default limit of 10', async () => {
    server.use(
      http.post(
        `${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`,
        async ({request}) => {
          const body = (await request.json()) as {query: string}
          expect(body.query).toContain('first: 10')

          return HttpResponse.json({
            data: {
              posts: {
                nodes: []
              }
            }
          })
        }
      )
    )

    await getTagBySlug('test-tag')
  })
})
