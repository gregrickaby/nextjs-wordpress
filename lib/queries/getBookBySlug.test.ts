import getBookBySlug from '@/lib/queries/getBookBySlug'
import {server} from '@/test-utils'
import {http, HttpResponse} from 'msw'

describe('getBookBySlug', () => {
  const mockBook = {
    databaseId: 1,
    title: 'Test Book',
    date: '2024-01-01T00:00:00',
    modified: '2024-01-01T00:00:00',
    content: '<p>Test book content</p>',
    bookFields: {
      affiliateUrl: 'https://example.com/affiliate',
      isbn: '978-1234567890'
    },
    featuredImage: {
      node: {
        sourceUrl: 'https://example.com/image.jpg',
        altText: 'Test book cover',
        mediaDetails: {
          width: 800,
          height: 1200
        }
      }
    },
    seo: {
      metaDesc: 'Test book description',
      title: 'Test Book - SEO Title'
    }
  }

  it('should fetch book by slug successfully', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json({
          data: {
            book: mockBook
          }
        })
      })
    )

    const book = await getBookBySlug('test-book')

    expect(book).toBeDefined()
    expect(book?.title).toBe('Test Book')
    expect(book?.bookFields.isbn).toBe('978-1234567890')
    expect(book?.bookFields.affiliateUrl).toBe('https://example.com/affiliate')
  })

  it('should return null when book is not found', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json({
          data: {
            book: null
          }
        })
      })
    )

    const book = await getBookBySlug('non-existent')

    expect(book).toBeNull()
  })

  it('should return null on API error', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json(
          {
            errors: [{message: 'Book not found'}]
          },
          {status: 404}
        )
      })
    )

    const book = await getBookBySlug('error-book')

    expect(book).toBeNull()
  })

  it('should handle null data gracefully', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json({
          data: null
        })
      })
    )

    const book = await getBookBySlug('test-book')

    expect(book).toBeNull()
  })
})
