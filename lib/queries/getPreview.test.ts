import getPreview from '@/lib/queries/getPreview'
import {server} from '@/test-utils'
import {http, HttpResponse} from 'msw'

describe('getPreview', () => {
  const mockPreviewPost = {
    databaseId: 1,
    title: 'Preview Post',
    date: '2024-01-01T00:00:00',
    modified: '2024-01-01T00:00:00',
    content: '<p>Preview content</p>',
    featuredImage: {
      node: {
        sourceUrl: 'https://example.com/image.jpg',
        altText: 'Preview image',
        mediaDetails: {
          width: 1200,
          height: 630
        }
      }
    },
    author: {
      node: {
        name: 'Preview Author',
        avatar: {
          url: 'https://example.com/avatar.jpg'
        }
      }
    },
    tags: {
      nodes: [
        {
          databaseId: 1,
          name: 'Preview Tag'
        }
      ]
    },
    categories: {
      nodes: [
        {
          databaseId: 1,
          name: 'Preview Category'
        }
      ]
    },
    seo: {
      metaDesc: 'Preview description',
      title: 'Preview Post - SEO Title'
    }
  }

  it('should fetch preview post successfully', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json({
          data: {
            post: mockPreviewPost
          }
        })
      })
    )

    const post = await getPreview('1')

    expect(post).toBeDefined()
    expect(post.title).toBe('Preview Post')
    expect(post.author?.node?.name).toBe('Preview Author')
    expect(post.tags?.nodes).toHaveLength(1)
    expect(post.categories?.nodes).toHaveLength(1)
  })

  it('should handle API errors gracefully', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json(
          {
            errors: [{message: 'Preview not found'}]
          },
          {status: 404}
        )
      })
    )

    await expect(getPreview('999')).rejects.toThrow()
  })

  it('should handle null response', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json({
          data: {
            post: null
          }
        })
      })
    )

    const post = await getPreview('1')

    expect(post).toBeNull()
  })
})
