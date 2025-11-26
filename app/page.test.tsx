import {http, HttpResponse, render, screen, server} from '@/test-utils'
import {axe} from 'jest-axe'
import Home from './page'

describe('Home', () => {
  it('should render homepage content and posts list', async () => {
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
                  title: 'Welcome to Homepage',
                  content: '<p>This is the homepage content</p>',
                  slug: 'homepage'
                }
              }
            })
          }

          if (body.query.includes('GetAllPosts')) {
            return HttpResponse.json({
              data: {
                posts: {
                  nodes: [
                    {
                      databaseId: 1,
                      title: 'Test Post',
                      slug: 'test-post',
                      excerpt: '<p>Test excerpt</p>',
                      date: '2024-01-01',
                      commentCount: 5,
                      featuredImage: {
                        node: {
                          sourceUrl: 'https://example.com/image.jpg',
                          altText: 'Test image',
                          mediaDetails: {
                            width: 288,
                            height: 230
                          }
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

    const HomeComponent = await Home()
    const {container} = render(HomeComponent)

    expect(screen.getByText('Welcome to Homepage')).toBeInTheDocument()
    expect(screen.getByText('This is the homepage content')).toBeInTheDocument()
    expect(screen.getByText('Latest Posts')).toBeInTheDocument()
    expect(screen.getByText('Test Post')).toBeInTheDocument()
    expect(screen.getByText('5 Comments')).toBeInTheDocument()

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should call notFound when no homepage data', async () => {
    server.use(
      http.post(
        `${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`,
        async ({request}) => {
          const body = (await request.json()) as {query: string}

          if (body.query.includes('GetPageBySlug')) {
            return HttpResponse.json({data: {page: null}})
          }

          if (body.query.includes('GetAllPosts')) {
            return HttpResponse.json({
              data: {
                posts: {
                  nodes: [
                    {
                      databaseId: 1,
                      title: 'Post',
                      slug: 'post',
                      excerpt: '',
                      date: '',
                      commentCount: 0
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

    // notFound() throws error
    await expect(Home()).rejects.toThrow()
  })

  it('should handle posts without featured images', async () => {
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
                  title: 'Homepage',
                  content: '<p>Content</p>',
                  slug: 'homepage'
                }
              }
            })
          }

          if (body.query.includes('GetAllPosts')) {
            return HttpResponse.json({
              data: {
                posts: {
                  nodes: [
                    {
                      databaseId: 1,
                      title: 'Post Without Image',
                      slug: 'post-without-image',
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

    const HomeComponent = await Home()
    const {container} = render(HomeComponent)

    expect(screen.getByText('Post Without Image')).toBeInTheDocument()
    expect(container.querySelector('img')).not.toBeInTheDocument()
  })

  it('should prioritize first two images', async () => {
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
                  title: 'Homepage',
                  content: '<p>Content</p>',
                  slug: 'homepage'
                }
              }
            })
          }

          if (body.query.includes('GetAllPosts')) {
            return HttpResponse.json({
              data: {
                posts: {
                  nodes: [
                    {
                      databaseId: 1,
                      title: 'Post 1',
                      slug: 'post-1',
                      excerpt: '<p>Excerpt 1</p>',
                      date: '2024-01-01',
                      commentCount: 0,
                      featuredImage: {
                        node: {
                          sourceUrl: 'https://example.com/image1.jpg',
                          altText: 'Image 1',
                          mediaDetails: {width: 288, height: 230}
                        }
                      }
                    },
                    {
                      databaseId: 2,
                      title: 'Post 2',
                      slug: 'post-2',
                      excerpt: '<p>Excerpt 2</p>',
                      date: '2024-01-02',
                      commentCount: 0,
                      featuredImage: {
                        node: {
                          sourceUrl: 'https://example.com/image2.jpg',
                          altText: 'Image 2',
                          mediaDetails: {width: 288, height: 230}
                        }
                      }
                    },
                    {
                      databaseId: 3,
                      title: 'Post 3',
                      slug: 'post-3',
                      excerpt: '<p>Excerpt 3</p>',
                      date: '2024-01-03',
                      commentCount: 0,
                      featuredImage: {
                        node: {
                          sourceUrl: 'https://example.com/image3.jpg',
                          altText: 'Image 3',
                          mediaDetails: {width: 288, height: 230}
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

    const HomeComponent = await Home()
    const {container} = render(HomeComponent)

    const images = container.querySelectorAll('img')
    expect(images).toHaveLength(3)

    // Verify images rendered correctly
    expect(images[0]).toHaveAttribute('src')
    expect(images[1]).toHaveAttribute('src')
    expect(images[2]).toHaveAttribute('src')
  })
})
