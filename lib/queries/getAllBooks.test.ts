import getAllBooks from '@/lib/queries/getAllBooks'
import {server} from '@/test-utils'
import {http, HttpResponse} from 'msw'

describe('getAllBooks', () => {
  it('should fetch all books successfully', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json({
          data: {
            books: {
              nodes: [
                {
                  databaseId: 1,
                  title: 'Test Book 1',
                  slug: 'test-book-1',
                  excerpt: 'Test excerpt 1',
                  date: '2024-01-01T00:00:00',
                  modified: '2024-01-01T00:00:00',
                  featuredImage: null,
                  seo: {
                    metaDesc: 'Test description',
                    title: 'Test Book 1'
                  }
                },
                {
                  databaseId: 2,
                  title: 'Test Book 2',
                  slug: 'test-book-2',
                  excerpt: 'Test excerpt 2',
                  date: '2024-01-02T00:00:00',
                  modified: '2024-01-02T00:00:00',
                  featuredImage: null,
                  seo: {
                    metaDesc: 'Test description 2',
                    title: 'Test Book 2'
                  }
                }
              ]
            }
          }
        })
      })
    )

    const books = await getAllBooks()

    expect(books).toHaveLength(2)
    expect(books[0].title).toBe('Test Book 1')
    expect(books[1].title).toBe('Test Book 2')
  })

  it('should return empty array when no books are found', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json({
          data: {
            books: {
              nodes: []
            }
          }
        })
      })
    )

    const books = await getAllBooks()

    expect(books).toEqual([])
  })

  it('should return empty array on API error', async () => {
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

    const books = await getAllBooks()

    expect(books).toEqual([])
  })

  it('should return empty array when response data is null', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json({
          data: null
        })
      })
    )

    const books = await getAllBooks()

    expect(books).toEqual([])
  })
})
