import {fetchGraphQL} from '@/lib/functions'
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
})
