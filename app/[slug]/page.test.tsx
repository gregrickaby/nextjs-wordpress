import {http, HttpResponse, render, screen, server} from '@/test-utils'
import {axe} from 'jest-axe'
import Archive from './page'

describe('Archive (Catch-all Page)', () => {
  describe('Single Page Rendering', () => {
    it('should render a single page with content', async () => {
      server.use(
        http.post(
          `${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`,
          async ({request}) => {
            const body = (await request.json()) as {query: string}

            if (body.query.includes('GetPageBySlug')) {
              return HttpResponse.json({
                data: {
                  page: {
                    databaseId: 1,
                    title: 'About Us',
                    content: '<p>This is the about page content.</p>',
                    slug: 'about'
                  }
                }
              })
            }

            return HttpResponse.json({data: {}})
          }
        )
      )

      const ArchiveComponent = await Archive({
        params: Promise.resolve({slug: 'about'})
      })
      const {container} = render(ArchiveComponent)

      expect(screen.getByText('About Us')).toBeInTheDocument()
      expect(
        screen.getByText('This is the about page content.')
      ).toBeInTheDocument()

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should handle page with null content gracefully', async () => {
      server.use(
        http.post(
          `${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`,
          async ({request}) => {
            const body = (await request.json()) as {query: string}

            if (body.query.includes('GetPageBySlug')) {
              return HttpResponse.json({
                data: {
                  page: {
                    databaseId: 1,
                    title: 'Empty Page',
                    content: null,
                    slug: 'empty'
                  }
                }
              })
            }

            return HttpResponse.json({data: {}})
          }
        )
      )

      const ArchiveComponent = await Archive({
        params: Promise.resolve({slug: 'empty'})
      })
      render(ArchiveComponent)

      expect(screen.getByText('Empty Page')).toBeInTheDocument()
    })
  })

  describe('Blog Archive', () => {
    it('should render blog archive with posts', async () => {
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
                      {
                        databaseId: 1,
                        title: 'Blog Post 1',
                        slug: 'blog-post-1',
                        excerpt: '<p>First post excerpt</p>',
                        date: '2024-01-01',
                        commentCount: 3,
                        featuredImage: {
                          node: {
                            sourceUrl: 'https://example.com/image1.jpg',
                            altText: 'Image 1',
                            mediaDetails: {width: 280, height: 233}
                          }
                        }
                      },
                      {
                        databaseId: 2,
                        title: 'Blog Post 2',
                        slug: 'blog-post-2',
                        excerpt: '<p>Second post excerpt</p>',
                        date: '2024-01-02',
                        commentCount: 5,
                        featuredImage: null
                      }
                    ]
                  }
                }
              })
            }

            return HttpResponse.json({data: {}})
          }
        )
      )

      const ArchiveComponent = await Archive({
        params: Promise.resolve({slug: 'blog'})
      })
      const {container} = render(ArchiveComponent)

      expect(screen.getByText('Latest blog')).toBeInTheDocument()
      expect(screen.getByText('Blog Post 1')).toBeInTheDocument()
      expect(screen.getByText('Blog Post 2')).toBeInTheDocument()
      expect(screen.getByText('3 Comments')).toBeInTheDocument()
      expect(screen.getByText('5 Comments')).toBeInTheDocument()

      // Verify images rendered correctly (only first post has image)
      const images = container.querySelectorAll('img')
      expect(images).toHaveLength(1)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should render blog archive with posts without featured images', async () => {
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
                      {
                        databaseId: 1,
                        title: 'Post Without Image',
                        slug: 'no-image',
                        excerpt: '<p>Excerpt</p>',
                        date: '2024-01-01',
                        commentCount: 0,
                        featuredImage: null
                      }
                    ]
                  }
                }
              })
            }

            return HttpResponse.json({data: {}})
          }
        )
      )

      const ArchiveComponent = await Archive({
        params: Promise.resolve({slug: 'blog'})
      })
      const {container} = render(ArchiveComponent)

      expect(screen.getByText('Post Without Image')).toBeInTheDocument()
      expect(container.querySelector('img')).not.toBeInTheDocument()
    })
  })

  describe('Books Archive', () => {
    it('should render books archive with books', async () => {
      server.use(
        http.post(
          `${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`,
          async ({request}) => {
            const body = (await request.json()) as {query: string}

            if (body.query.includes('GetAllBooks')) {
              return HttpResponse.json({
                data: {
                  books: {
                    nodes: [
                      {
                        databaseId: 1,
                        title: 'Book Title 1',
                        slug: 'book-1',
                        excerpt: '<p>Book 1 description</p>',
                        date: '2024-01-01',
                        commentCount: 10,
                        featuredImage: {
                          node: {
                            sourceUrl: 'https://example.com/book1.jpg',
                            altText: 'Book 1 Cover',
                            mediaDetails: {width: 280, height: 233}
                          }
                        }
                      }
                    ]
                  }
                }
              })
            }

            return HttpResponse.json({data: {}})
          }
        )
      )

      const ArchiveComponent = await Archive({
        params: Promise.resolve({slug: 'books'})
      })
      render(ArchiveComponent)

      expect(screen.getByText('Latest books')).toBeInTheDocument()
      expect(screen.getByText('Book Title 1')).toBeInTheDocument()
      expect(screen.getByText('10 Comments')).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    it('should return undefined when page does not exist (calls notFound)', async () => {
      server.use(
        http.post(
          `${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`,
          async ({request}) => {
            const body = (await request.json()) as {query: string}

            if (body.query.includes('GetPageBySlug')) {
              return HttpResponse.json({data: {page: null}})
            }

            return HttpResponse.json({data: {}})
          }
        )
      )

      // notFound() in Next.js doesn't throw in test environment, returns undefined
      const result = await Archive({
        params: Promise.resolve({slug: 'non-existent'})
      })
      expect(result).toBeUndefined()
    })

    it('should return undefined when blog posts are empty (calls notFound)', async () => {
      server.use(
        http.post(
          `${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`,
          async ({request}) => {
            const body = (await request.json()) as {query: string}

            if (body.query.includes('GetAllPosts')) {
              return HttpResponse.json({
                data: {posts: {nodes: []}}
              })
            }

            return HttpResponse.json({data: {}})
          }
        )
      )

      const result = await Archive({params: Promise.resolve({slug: 'blog'})})
      expect(result).toBeUndefined()
    })

    it('should return undefined when books are empty (calls notFound)', async () => {
      server.use(
        http.post(
          `${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`,
          async ({request}) => {
            const body = (await request.json()) as {query: string}

            if (body.query.includes('GetAllBooks')) {
              return HttpResponse.json({
                data: {books: {nodes: []}}
              })
            }

            return HttpResponse.json({data: {}})
          }
        )
      )

      const result = await Archive({params: Promise.resolve({slug: 'books'})})
      expect(result).toBeUndefined()
    })

    it('should return undefined on GraphQL errors (calls notFound)', async () => {
      server.use(
        http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
          return new HttpResponse(null, {status: 500})
        })
      )

      const result = await Archive({params: Promise.resolve({slug: 'test'})})
      expect(result).toBeUndefined()
    })
  })

  describe('Context and Links', () => {
    it('should render correct links for blog posts', async () => {
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
                      {
                        databaseId: 1,
                        title: 'Test Post',
                        slug: 'test-post',
                        excerpt: '<p>Excerpt</p>',
                        date: '2024-01-01',
                        commentCount: 0,
                        featuredImage: null
                      }
                    ]
                  }
                }
              })
            }

            return HttpResponse.json({data: {}})
          }
        )
      )

      const ArchiveComponent = await Archive({
        params: Promise.resolve({slug: 'blog'})
      })
      render(ArchiveComponent)

      const titleLink = screen.getByRole('link', {name: /Test Post/i})
      expect(titleLink).toHaveAttribute('href', '/blog/test-post')

      const viewLink = screen.getByRole('link', {name: /View Post/i})
      expect(viewLink).toHaveAttribute('href', '/blog/test-post')
    })

    it('should render correct links for books', async () => {
      server.use(
        http.post(
          `${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`,
          async ({request}) => {
            const body = (await request.json()) as {query: string}

            if (body.query.includes('GetAllBooks')) {
              return HttpResponse.json({
                data: {
                  books: {
                    nodes: [
                      {
                        databaseId: 1,
                        title: 'Test Book',
                        slug: 'test-book',
                        excerpt: '<p>Description</p>',
                        date: '2024-01-01',
                        commentCount: 0,
                        featuredImage: null
                      }
                    ]
                  }
                }
              })
            }

            return HttpResponse.json({data: {}})
          }
        )
      )

      const ArchiveComponent = await Archive({
        params: Promise.resolve({slug: 'books'})
      })
      render(ArchiveComponent)

      const titleLink = screen.getByRole('link', {name: /Test Book/i})
      expect(titleLink).toHaveAttribute('href', '/books/test-book')
    })
  })
})
