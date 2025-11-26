import {server} from '@/test-utils'
import {http, HttpResponse} from 'msw'
import {GET} from './route'

describe('GET /feed.xml', () => {
  it('should generate valid RSS feed with posts', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json({
          data: {
            posts: {
              nodes: [
                {
                  title: 'Test Post 1',
                  slug: 'test-post-1',
                  excerpt: 'This is test post 1',
                  date: '2024-01-01T00:00:00'
                },
                {
                  title: 'Test Post 2',
                  slug: 'test-post-2',
                  excerpt: 'This is test post 2',
                  date: '2024-01-02T00:00:00'
                }
              ]
            }
          }
        })
      })
    )

    const response = await GET()
    const rss = await response.text()

    expect(response.status).toBe(200)
    expect(response.headers.get('Content-Type')).toBe(
      'application/xml; charset=utf-8'
    )

    // Verify RSS structure
    expect(rss).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(rss).toContain('<rss version="2.0">')
    expect(rss).toContain('<channel>')
    expect(rss).toContain('</channel>')
    expect(rss).toContain('</rss>')

    // Verify channel metadata
    expect(rss).toContain('<title>Next.js WordPress</title>')
    expect(rss).toContain('<generator>RSS for Node and Next.js</generator>')
    expect(rss).toContain('<ttl>60</ttl>')

    // Verify posts are included
    expect(rss).toContain('<item>')
    expect(rss).toContain('<title>Test Post 1</title>')
    expect(rss).toContain('<description>This is test post 1</description>')
    expect(rss).toContain('<link>https://nextjswp.com/blog/test-post-1</link>')
    expect(rss).toContain('<guid>https://nextjswp.com/blog/test-post-1</guid>')

    expect(rss).toContain('<title>Test Post 2</title>')
    expect(rss).toContain('<description>This is test post 2</description>')
  })

  it('should handle empty posts array', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json({
          data: {
            posts: {
              nodes: []
            }
          }
        })
      })
    )

    const response = await GET()
    const rss = await response.text()

    expect(response.status).toBe(200)
    expect(rss).toContain('<rss version="2.0">')
    expect(rss).toContain('<channel>')
    expect(rss).toContain('</channel>')
    expect(rss).toContain('</rss>')

    // Should not contain any items
    expect(rss.match(/<item>/g)).toBeNull()
  })

  it('should handle null posts', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json({
          data: {
            posts: {
              nodes: null
            }
          }
        })
      })
    )

    const response = await GET()
    const rss = await response.text()

    expect(response.status).toBe(200)
    expect(response.headers.get('Content-Type')).toBe(
      'application/xml; charset=utf-8'
    )
    // Route returns empty RSS feed for null/empty posts, not error message
    expect(rss).toContain('<rss version="2.0">')
    expect(rss).toContain('<channel>')
  })

  it('should escape XML special characters', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json({
          data: {
            posts: {
              nodes: [
                {
                  title: 'Post with <special> & "characters"',
                  slug: 'post-with-special-characters',
                  excerpt: 'Excerpt with <tags> & entities',
                  date: '2024-01-01T00:00:00'
                }
              ]
            }
          }
        })
      })
    )

    const response = await GET()
    const rss = await response.text()

    // Verify XML special characters are escaped
    expect(rss).toContain('&lt;special&gt;')
    expect(rss).toContain('&amp;')
    expect(rss).toContain('&quot;')

    // Should not contain unescaped characters
    expect(rss).not.toContain('<special>')
    expect(rss).not.toContain('& "')
  })

  it('should handle posts with null fields gracefully', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json({
          data: {
            posts: {
              nodes: [
                {
                  title: null,
                  slug: 'test-post',
                  excerpt: null,
                  date: null
                }
              ]
            }
          }
        })
      })
    )

    const response = await GET()
    const rss = await response.text()

    expect(response.status).toBe(200)

    // Should handle null values with empty strings
    expect(rss).toContain('<title></title>')
    expect(rss).toContain('<description></description>')
    expect(rss).toContain('<link>https://nextjswp.com/blog/test-post</link>')
  })

  it('should handle WordPress API errors gracefully', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return new HttpResponse(null, {status: 500})
      })
    )

    const response = await GET()
    const rss = await response.text()

    expect(response.status).toBe(200)
    // Route returns empty RSS feed for errors, not error message
    expect(rss).toContain('<rss version="2.0">')
    expect(rss).toContain('<channel>')
  })

  it('should format dates correctly in RFC 822 format', async () => {
    const testDate = '2024-01-15T12:30:00'

    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json({
          data: {
            posts: {
              nodes: [
                {
                  title: 'Date Test Post',
                  slug: 'date-test-post',
                  excerpt: 'Testing date formatting',
                  date: testDate
                }
              ]
            }
          }
        })
      })
    )

    const response = await GET()
    const rss = await response.text()

    // Verify pubDate is in RFC 822 format (e.g., "Mon, 15 Jan 2024 12:30:00 GMT")
    expect(rss).toMatch(/<pubDate>[A-Za-z]{3}, \d{2} [A-Za-z]{3} \d{4}/)
  })

  it('should include channel pubDate', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json({
          data: {
            posts: {
              nodes: []
            }
          }
        })
      })
    )

    const response = await GET()
    const rss = await response.text()

    // Channel should have a pubDate
    const channelPubDateRegex = /<channel>[\s\S]*?<pubDate>([^<]+)<\/pubDate>/
    const channelPubDateMatch = channelPubDateRegex.exec(rss)
    expect(channelPubDateMatch).not.toBeNull()
  })
})
