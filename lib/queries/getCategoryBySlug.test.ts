import getCategoryBySlug from '@/lib/queries/getCategoryBySlug'
import {server} from '@/test-utils'
import {http, HttpResponse} from 'msw'

describe('getCategoryBySlug', () => {
  it('should fetch posts by category slug successfully', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json({
          data: {
            posts: {
              nodes: [
                {
                  databaseId: 1,
                  title: 'Category Post 1',
                  slug: 'category-post-1',
                  excerpt: 'Test excerpt 1',
                  date: '2024-01-01T00:00:00',
                  featuredImage: null,
                  seo: {
                    metaDesc: 'Test description',
                    title: 'Category Post 1'
                  }
                },
                {
                  databaseId: 2,
                  title: 'Category Post 2',
                  slug: 'category-post-2',
                  excerpt: 'Test excerpt 2',
                  date: '2024-01-02T00:00:00',
                  featuredImage: null,
                  seo: {
                    metaDesc: 'Test description 2',
                    title: 'Category Post 2'
                  }
                }
              ]
            }
          }
        })
      })
    )

    const posts = await getCategoryBySlug('test-category')

    expect(posts).toHaveLength(2)
    expect(posts[0].title).toBe('Category Post 1')
    expect(posts[1].title).toBe('Category Post 2')
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
                  title: 'Category Post 1',
                  slug: 'category-post-1',
                  excerpt: 'Test excerpt 1',
                  date: '2024-01-01T00:00:00',
                  featuredImage: null,
                  seo: {
                    metaDesc: 'Test description',
                    title: 'Category Post 1'
                  }
                }
              ]
            }
          }
        })
      })
    )

    const posts = await getCategoryBySlug('test-category', 5)

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

    await expect(getCategoryBySlug('error-category')).rejects.toThrow()
  })
})
