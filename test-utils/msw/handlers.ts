import {http, HttpResponse} from 'msw'

/**
 * MSW handlers for mocking API requests in tests.
 * Add handlers for WordPress GraphQL API, REST API, etc.
 */
export const handlers = [
  // Example: Mock WordPress GraphQL endpoint
  http.post(
    `${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL || 'http://localhost/graphql'}`,
    async ({request}) => {
      const body = (await request.json()) as {query: string}

      // Example: Mock a simple query response
      if (body.query.includes('allPosts')) {
        return HttpResponse.json({
          data: {
            posts: {
              nodes: [
                {
                  id: 'cG9zdDox',
                  title: 'Test Post',
                  slug: 'test-post',
                  excerpt: 'Test excerpt',
                  date: '2024-01-01T00:00:00',
                  featuredImage: null
                }
              ]
            }
          }
        })
      }

      // Default response
      return HttpResponse.json({
        data: {},
        errors: []
      })
    }
  )

  // Add more handlers as needed for your WordPress API endpoints
]
