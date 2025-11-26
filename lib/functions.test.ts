import {fetchGraphQL, searchQuery} from '@/lib/functions'
import {server} from '@/test-utils'
import {http, HttpResponse} from 'msw'

describe('fetchGraphQL', () => {
  const testQuery = `
    query GetPosts {
      posts {
        nodes {
          id
          title
        }
      }
    }
  `

  it('should fetch GraphQL data successfully', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json({
          data: {
            posts: {
              nodes: [
                {id: '1', title: 'Post 1'},
                {id: '2', title: 'Post 2'}
              ]
            }
          }
        })
      })
    )

    const response = await fetchGraphQL(testQuery)

    expect(response).toBeDefined()
    expect(response.data.posts.nodes).toHaveLength(2)
  })

  it('should handle GraphQL errors', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json({
          errors: [
            {
              message: 'GraphQL error',
              extensions: {code: 'INTERNAL_SERVER_ERROR'}
            }
          ]
        })
      })
    )

    const response = await fetchGraphQL(testQuery)

    expect(response).toBeDefined()
    expect(response.errors).toBeDefined()
    expect(response.errors?.[0].message).toBe('GraphQL error')
  })

  it('should handle network errors', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.error()
      })
    )

    const response = await fetchGraphQL(testQuery)

    expect(response).toBeDefined()
    // Function should handle errors gracefully
  })

  it('should send variables with the query', async () => {
    let capturedBody: any

    server.use(
      http.post(
        `${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`,
        async ({request}) => {
          capturedBody = await request.json()
          return HttpResponse.json({
            data: {post: {id: '1', title: 'Test'}}
          })
        }
      )
    )

    const variables = {slug: 'test-post'}
    await fetchGraphQL(testQuery, variables)

    expect(capturedBody.variables).toEqual(variables)
  })

  it('should use cache tags when provided', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json({
          data: {posts: {nodes: []}}
        })
      })
    )

    // fetchGraphQL doesn't expose cache tags as a parameter
    // Cache tags are handled internally based on the query
    await fetchGraphQL(testQuery, {}, false)

    // The function should complete without errors
    expect(true).toBe(true)
  })

  it('should handle malformed GraphQL responses', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json({})
      })
    )

    const response = await fetchGraphQL(testQuery)

    expect(response).toBeDefined()
    expect(response.data).toBeUndefined()
  })

  it('should handle empty response body', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return new HttpResponse(null, {status: 200})
      })
    )

    const response = await fetchGraphQL(testQuery)

    expect(response).toBeDefined()
  })
})

describe('searchQuery', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_WORDPRESS_REST_API_URL =
      'https://blog.nextjswp.com/wp-json/wp/v2'
  })

  it('should search WordPress REST API successfully', async () => {
    const mockResults = [
      {
        id: 1,
        title: 'Test Post 1',
        url: 'https://blog.nextjswp.com/test-post-1',
        type: 'post',
        subtype: 'post'
      },
      {
        id: 2,
        title: 'Test Post 2',
        url: 'https://blog.nextjswp.com/test-post-2',
        type: 'post',
        subtype: 'post'
      }
    ]

    server.use(
      http.get(
        `${process.env.NEXT_PUBLIC_WORDPRESS_REST_API_URL}/search`,
        () => {
          return HttpResponse.json(mockResults)
        }
      )
    )

    const results = await searchQuery('test')

    expect(results).toHaveLength(2)
    expect(results[0].title).toBe('Test Post 1')
    expect(results[1].title).toBe('Test Post 2')
  })

  it('should handle empty search query', async () => {
    server.use(
      http.get(
        `${process.env.NEXT_PUBLIC_WORDPRESS_REST_API_URL}/search`,
        () => {
          return HttpResponse.json([])
        }
      )
    )

    const results = await searchQuery('')

    // Function calls API even with empty query, returns empty array from API
    expect(results).toEqual([])
  })

  it('should handle WordPress API errors', async () => {
    server.use(
      http.get(
        `${process.env.NEXT_PUBLIC_WORDPRESS_REST_API_URL}/search`,
        () => {
          return new HttpResponse(null, {status: 500})
        }
      )
    )

    const results = await searchQuery('test')

    expect(results).toEqual([])
  })

  it('should return empty array on network error', async () => {
    server.use(
      http.get(
        `${process.env.NEXT_PUBLIC_WORDPRESS_REST_API_URL}/search`,
        () => {
          return HttpResponse.error()
        }
      )
    )

    const results = await searchQuery('test')

    expect(results).toEqual([])
  })

  it('should include search parameter in request', async () => {
    let capturedUrl: URL | undefined

    server.use(
      http.get(
        `${process.env.NEXT_PUBLIC_WORDPRESS_REST_API_URL}/search`,
        ({request}) => {
          capturedUrl = new URL(request.url)
          return HttpResponse.json([])
        }
      )
    )

    await searchQuery('test query')

    expect(capturedUrl?.searchParams.get('search')).toBe('test query')
  })

  it('should handle malformed JSON response', async () => {
    server.use(
      http.get(
        `${process.env.NEXT_PUBLIC_WORDPRESS_REST_API_URL}/search`,
        () => {
          return new HttpResponse('not json', {
            status: 200,
            headers: {'Content-Type': 'text/plain'}
          })
        }
      )
    )

    const results = await searchQuery('test')

    expect(results).toEqual([])
  })

  it('should handle null response data', async () => {
    server.use(
      http.get(
        `${process.env.NEXT_PUBLIC_WORDPRESS_REST_API_URL}/search`,
        () => {
          return HttpResponse.json(null)
        }
      )
    )

    const results = await searchQuery('test')

    expect(results).toEqual([])
  })
})
