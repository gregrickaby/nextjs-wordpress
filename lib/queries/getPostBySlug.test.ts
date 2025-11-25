import getPostBySlug from '@/lib/queries/getPostBySlug'
import {server} from '@/test-utils'
import {http, HttpResponse} from 'msw'

describe('getPostBySlug', () => {
  const mockPost = {
    id: 'cG9zdDox',
    databaseId: 1,
    title: 'Test Post',
    slug: 'test-post',
    excerpt: 'Test excerpt',
    content: '<p>Test content</p>',
    date: '2024-01-01T00:00:00',
    author: {
      node: {
        name: 'Test Author'
      }
    },
    categories: {
      nodes: [
        {
          name: 'Test Category',
          slug: 'test-category'
        }
      ]
    },
    tags: {
      nodes: []
    },
    featuredImage: {
      node: {
        sourceUrl: 'https://example.com/image.jpg',
        altText: 'Test image',
        mediaDetails: {
          width: 1200,
          height: 630
        }
      }
    }
  }

  it('should fetch post by slug successfully', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json({
          data: {
            post: mockPost
          }
        })
      })
    )

    const post = await getPostBySlug('test-post')

    expect(post).toBeDefined()
    expect(post?.title).toBe('Test Post')
    expect(post?.slug).toBe('test-post')
    expect(post?.author?.node?.name).toBe('Test Author')
  })

  it('should return null when post is not found', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json({
          data: {
            post: null
          }
        })
      })
    )

    const post = await getPostBySlug('non-existent')

    expect(post).toBeNull()
  })

  it('should return null on API error', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json(
          {
            errors: [{message: 'Post not found'}]
          },
          {status: 404}
        )
      })
    )

    const post = await getPostBySlug('error-post')

    expect(post).toBeNull()
  })
})
