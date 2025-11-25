import {vi} from 'vitest'

export function setupBrowserMocks() {
  // Mock window.matchMedia
  if (!globalThis.window?.matchMedia) {
    Object.defineProperty(globalThis.window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn()
      }))
    })
  }

  // Mock ResizeObserver
  if (!globalThis.window?.ResizeObserver) {
    class ResizeObserver {
      observe = vi.fn()
      unobserve = vi.fn()
      disconnect = vi.fn()
    }
    globalThis.window.ResizeObserver = ResizeObserver as any
  }

  // Mock scrollTo
  if (!globalThis.window?.scrollTo) {
    globalThis.window.scrollTo = vi.fn()
  }

  // Mock IntersectionObserver
  if (!globalThis.window?.IntersectionObserver) {
    class IntersectionObserver {
      observe = vi.fn()
      unobserve = vi.fn()
      disconnect = vi.fn()
      takeRecords = vi.fn().mockReturnValue([])
      root = null
      rootMargin = ''
      thresholds = []
    }
    globalThis.window.IntersectionObserver = IntersectionObserver as any
  }
}
