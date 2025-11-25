import getAllPages from '@/lib/queries/getAllPages'
import {server} from '@/test-utils'
import {http, HttpResponse} from 'msw'

describe('getAllPages', () => {
  it('should fetch all pages successfully', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json({
          data: {
            pages: {
              nodes: [
                {
                  databaseId: 1,
                  title: 'Test Page 1',
                  slug: 'test-page-1',
                  content: '<p>Test content 1</p>',
                  excerpt: 'Test excerpt 1',
                  date: '2024-01-01T00:00:00',
                  modified: '2024-01-01T00:00:00',
                  featuredImage: null,
                  seo: {
                    metaDesc: 'Test description',
                    title: 'Test Page 1'
                  }
                },
                {
                  databaseId: 2,
                  title: 'Test Page 2',
                  slug: 'test-page-2',
                  content: '<p>Test content 2</p>',
                  excerpt: 'Test excerpt 2',
                  date: '2024-01-02T00:00:00',
                  modified: '2024-01-02T00:00:00',
                  featuredImage: null,
                  seo: {
                    metaDesc: 'Test description 2',
                    title: 'Test Page 2'
                  }
                }
              ]
            }
          }
        })
      })
    )

    const pages = await getAllPages()

    expect(pages).toHaveLength(2)
    expect(pages[0].title).toBe('Test Page 1')
    expect(pages[1].title).toBe('Test Page 2')
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

    await expect(getAllPages()).rejects.toThrow()
  })
})
