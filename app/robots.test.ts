import robots from './robots'

describe('robots', () => {
  it('should generate robots.txt with correct structure', () => {
    const result = robots()

    expect(result).toEqual({
      rules: {
        userAgent: '*',
        allow: '/'
      },
      sitemap: expect.stringContaining('/sitemap.xml')
    })
  })

  it('should include sitemap URL', () => {
    const result = robots()

    expect(result.sitemap).toMatch(/https?:\/\/.*\/sitemap\.xml/)
  })

  it('should allow all user agents', () => {
    const result = robots()

    // Type guard to ensure rules is an object not array
    if (!Array.isArray(result.rules)) {
      expect(result.rules.userAgent).toBe('*')
      expect(result.rules.allow).toBe('/')
    }
  })
})
