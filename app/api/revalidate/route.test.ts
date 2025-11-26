import {NextRequest} from 'next/server'
import {GET} from './route'

// Mock Next.js cache functions
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
  revalidateTag: vi.fn()
}))

function createMockRequest(options: {
  secret?: string
  slug?: string
  ip?: string
}): NextRequest {
  const url = new URL('http://localhost:3000/api/revalidate')
  if (options.slug) {
    url.searchParams.set('slug', options.slug)
  }

  const headers = new Headers()
  if (options.secret) {
    headers.set('x-revalidation-secret', options.secret)
  }
  if (options.ip) {
    headers.set('x-forwarded-for', options.ip)
  }

  return new NextRequest(url, {headers})
}

describe('GET /api/revalidate', () => {
  const validSecret = 'test-secret'
  const mockIP = '192.168.1.1'

  beforeEach(() => {
    vi.clearAllMocks()
    process.env.NEXTJS_REVALIDATION_SECRET = validSecret
  })

  afterEach(() => {
    // Clear rate limit map between tests
    vi.clearAllMocks()
  })

  it('should return 400 when secret is missing', async () => {
    const request = createMockRequest({slug: 'test-page', ip: mockIP})
    const response = await GET(request)

    expect(response.status).toBe(401)

    const data = await response.json()
    expect(data.revalidated).toBe(false)
    expect(data.message).toBe('Invalid secret')
  })

  it('should return 401 when secret is invalid', async () => {
    const request = createMockRequest({
      secret: 'wrong-secret',
      slug: 'test-page',
      ip: mockIP
    })
    const response = await GET(request)

    expect(response.status).toBe(401)

    const data = await response.json()
    expect(data.revalidated).toBe(false)
    expect(data.message).toBe('Invalid secret')
  })

  it('should return 400 when slug is missing', async () => {
    const request = createMockRequest({secret: validSecret, ip: mockIP})
    const response = await GET(request)

    expect(response.status).toBe(400)

    const data = await response.json()
    expect(data.revalidated).toBe(false)
    expect(data.message).toBe('Invalid slug parameter.')
  })

  it('should return 400 when slug contains invalid characters', async () => {
    const request = createMockRequest({
      secret: validSecret,
      slug: '../../../etc/passwd',
      ip: mockIP
    })
    const response = await GET(request)

    expect(response.status).toBe(400)

    const data = await response.json()
    expect(data.revalidated).toBe(false)
    expect(data.message).toBe('Invalid slug parameter.')
  })

  it('should revalidate successfully with valid secret and slug', async () => {
    const {revalidatePath, revalidateTag} = await import('next/cache')

    const request = createMockRequest({
      secret: validSecret,
      slug: 'blog/test-post',
      ip: mockIP
    })
    const response = await GET(request)

    expect(response.status).toBe(200)

    const data = await response.json()
    expect(data.revalidated).toBe(true)
    expect(data.revalidatePath).toBe('blog/test-post')
    expect(data.revalidateTags).toEqual(['blog/test-post', 'graphql'])
    expect(data.revalidationTime).toBeDefined()

    // Verify cache functions were called
    expect(revalidatePath).toHaveBeenCalledWith('blog/test-post', 'page')
    expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')
    expect(revalidatePath).toHaveBeenCalledWith('/')
    expect(revalidateTag).toHaveBeenCalledWith('blog/test-post', 'max')
    expect(revalidateTag).toHaveBeenCalledWith('graphql', 'max')
  })

  it('should allow slugs with valid characters', async () => {
    const validSlugs = [
      'simple',
      'with-dashes',
      'with_underscores',
      'blog/nested-path',
      'a1b2c3'
    ]

    for (const slug of validSlugs) {
      const request = createMockRequest({
        secret: validSecret,
        slug,
        ip: `${mockIP}-${slug}`
      })
      const response = await GET(request)

      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.revalidated).toBe(true)
    }
  })

  it('should return 429 when rate limit is exceeded', async () => {
    const rateLimitIP = '10.0.0.1'

    // Make 10 requests (max allowed)
    for (let i = 0; i < 10; i++) {
      const request = createMockRequest({
        secret: validSecret,
        slug: `test-page-${i}`,
        ip: rateLimitIP
      })
      await GET(request)
    }

    // 11th request should be rate limited
    const request = createMockRequest({
      secret: validSecret,
      slug: 'test-page-11',
      ip: rateLimitIP
    })
    const response = await GET(request)

    expect(response.status).toBe(429)

    const data = await response.json()
    expect(data.revalidated).toBe(false)
    expect(data.message).toBe('Rate limit exceeded')

    // Verify Retry-After header
    expect(response.headers.get('Retry-After')).toBe('60')
  })

  it('should handle revalidation errors gracefully', async () => {
    const {revalidatePath} = await import('next/cache')

    // Mock revalidatePath to throw an error
    vi.mocked(revalidatePath).mockImplementationOnce(() => {
      throw new Error('Revalidation failed')
    })

    const request = createMockRequest({
      secret: validSecret,
      slug: 'test-page',
      ip: 'error-ip'
    })
    const response = await GET(request)

    expect(response.status).toBe(500)

    const data = await response.json()
    expect(data.revalidated).toBe(false)
    expect(data.error).toBe('Revalidation failed')
  })

  it('should set correct headers on all responses', async () => {
    const request = createMockRequest({
      secret: validSecret,
      slug: 'test-page',
      ip: mockIP
    })
    const response = await GET(request)

    expect(response.headers.get('Content-Type')).toBe('application/json')
    expect(response.headers.get('X-Robots-Tag')).toBe('noindex')
  })

  it('should handle unknown IP addresses', async () => {
    const url = new URL('http://localhost:3000/api/revalidate')
    url.searchParams.set('slug', 'test-page')

    const headers = new Headers()
    headers.set('x-revalidation-secret', validSecret)
    // No x-forwarded-for header

    const request = new NextRequest(url, {headers})
    const response = await GET(request)

    expect(response.status).toBe(200)

    const data = await response.json()
    expect(data.revalidated).toBe(true)
  })
})
