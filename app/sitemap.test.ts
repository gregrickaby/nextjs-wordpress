import {http, HttpResponse, server} from '@/test-utils'
import sitemap from './sitemap'

describe('sitemap', () => {
  it('should generate sitemap with posts and pages', async () => {
    server.use(
      http.post(
        `${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`,
        async ({request}) => {
          const body = (await request.json()) as {query: string}

          if (body.query.includes('GetAllPosts')) {
            return HttpResponse.json({
              data: {
                posts: {
                  nodes: [
                    {slug: 'test-post-1', databaseId: 1},
                    {slug: 'test-post-2', databaseId: 2}
                  ]
                }
              }
            })
          }

          if (body.query.includes('GetAllPages')) {
            return HttpResponse.json({
              data: {
                pages: {
                  nodes: [
                    {slug: 'about', databaseId: 3},
                    {slug: 'contact', databaseId: 4}
                  ]
                }
              }
            })
          }

          return HttpResponse.json({data: {}})
        }
      )
    )

    const result = await sitemap()

    expect(result).toHaveLength(4)
    expect(result[0].url).toContain('/about')
    expect(result[1].url).toContain('/contact')
    expect(result[2].url).toContain('/blog/test-post-1')
    expect(result[3].url).toContain('/blog/test-post-2')
  })

  it('should set correct metadata for entries', async () => {
    server.use(
      http.post(
        `${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`,
        async ({request}) => {
          const body = (await request.json()) as {query: string}

          if (body.query.includes('GetAllPosts')) {
            return HttpResponse.json({
              data: {posts: {nodes: [{slug: 'test', databaseId: 1}]}}
            })
          }

          if (body.query.includes('GetAllPages')) {
            return HttpResponse.json({
              data: {pages: {nodes: []}}
            })
          }

          return HttpResponse.json({data: {}})
        }
      )
    )

    const result = await sitemap()

    expect(result[0]).toMatchObject({
      url: expect.any(String),
      changeFrequency: 'monthly',
      priority: 0.5
    })
  })

  it('should handle empty posts and pages', async () => {
    server.use(
      http.post(
        `${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`,
        async ({request}) => {
          const body = (await request.json()) as {query: string}

          if (body.query.includes('GetAllPosts')) {
            return HttpResponse.json({data: {posts: {nodes: []}}})
          }

          if (body.query.includes('GetAllPages')) {
            return HttpResponse.json({data: {pages: {nodes: []}}})
          }

          return HttpResponse.json({data: {}})
        }
      )
    )

    const result = await sitemap()

    expect(result).toEqual([])
  })

  it('should return empty array on error', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return new HttpResponse(null, {status: 500})
      })
    )

    const result = await sitemap()

    expect(result).toEqual([])
  })

  it('should handle GraphQL errors gracefully', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json({
          errors: [{message: 'GraphQL error'}]
        })
      })
    )

    const result = await sitemap()

    expect(result).toEqual([])
  })
})
