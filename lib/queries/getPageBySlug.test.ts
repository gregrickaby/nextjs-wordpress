import getPageBySlug from '@/lib/queries/getPageBySlug'
import {server} from '@/test-utils'
import {http, HttpResponse} from 'msw'

describe('getPageBySlug', () => {
  const mockPage = {
    databaseId: 1,
    title: 'Test Page',
    date: '2024-01-01T00:00:00',
    modified: '2024-01-01T00:00:00',
    content: '<p>Test page content</p>',
    featuredImage: {
      node: {
        sourceUrl: 'https://example.com/image.jpg',
        altText: 'Test page image',
        mediaDetails: {
          width: 1200,
          height: 630
        }
      }
    },
    author: {
      node: {
        name: 'Test Author',
        avatar: {
          url: 'https://example.com/avatar.jpg'
        }
      }
    },
    seo: {
      metaDesc: 'Test page description',
      title: 'Test Page - SEO Title'
    }
  }

  it('should fetch page by slug successfully', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json({
          data: {
            page: mockPage
          }
        })
      })
    )

    const page = await getPageBySlug('test-page')

    expect(page).toBeDefined()
    expect(page?.title).toBe('Test Page')
    expect(page?.author.node.name).toBe('Test Author')
  })

  it('should return null when page is not found', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json({
          data: {
            page: null
          }
        })
      })
    )

    const page = await getPageBySlug('non-existent')

    expect(page).toBeNull()
  })

  it('should return null on API error', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json(
          {
            errors: [{message: 'Page not found'}]
          },
          {status: 404}
        )
      })
    )

    const page = await getPageBySlug('error-page')

    expect(page).toBeNull()
  })

  it('should handle null data gracefully', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json({
          data: null
        })
      })
    )

    const page = await getPageBySlug('test-page')

    expect(page).toBeNull()
  })
})
