import {metadata} from './layout'

describe('RootLayout', () => {
  it('should export correct metadata', () => {
    expect(metadata).toBeDefined()
    expect(metadata.title).toContain('Next.js WordPress')
    expect(metadata.description).toBe("It's headless WordPress!")
    expect(metadata.metadataBase).toBeDefined()
    expect(metadata.metadataBase?.toString()).toContain('https')
  })
})
