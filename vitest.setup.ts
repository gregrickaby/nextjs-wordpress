import {installDomShims, removeDomShims} from '@/test-utils/domShims'
import {setupBrowserMocks} from '@/test-utils/mocks/browserMocks'
import {server} from '@/test-utils/msw/server'
import '@testing-library/jest-dom'
import {toHaveNoViolations} from 'jest-axe'
import type {StaticImageData} from 'next/image'
import {URLSearchParams as NodeURLSearchParams} from 'node:url'
import React, {type ImgHTMLAttributes} from 'react'
import {afterAll, afterEach, beforeAll, vi} from 'vitest'

expect.extend(toHaveNoViolations)

interface MockNextImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string | StaticImageData
  alt: string
  priority?: boolean
  unoptimized?: boolean
}

vi.mock('next/image', () => ({
  __esModule: true,
  default: ({src, alt, priority, unoptimized, ...rest}: MockNextImageProps) => {
    const imgSrc = typeof src === 'string' ? src : src.src
    return React.createElement('img', {...rest, src: imgSrc, alt})
  }
}))

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn()
  })),
  usePathname: vi.fn(() => '/'),
  useSearchParams: vi.fn(() => new URLSearchParams()),
  notFound: vi.fn()
}))

// Polyfill: Vitest does not provide URLSearchParams in Node by default
// https://github.com/vitest-dev/vitest/issues/7906
globalThis.URLSearchParams = NodeURLSearchParams as any

// Set up base URL for test environment
if (globalThis.window !== undefined) {
  Object.defineProperty(globalThis.window, 'location', {
    value: {
      ...globalThis.window.location,
      origin: 'http://localhost:3000',
      host: 'localhost:3000',
      hostname: 'localhost',
      port: '3000',
      protocol: 'http:',
      href: 'http://localhost:3000'
    },
    writable: true
  })
}

// Set up DOM-related browser APIs
if (globalThis.window !== undefined) {
  setupBrowserMocks()
}

// Global setup for Vitest test environment
beforeAll(() => {
  server.listen({onUnhandledRequest: 'warn'})

  if (globalThis.window !== undefined) {
    installDomShims()
  }

  // Stub common environment variables for testing
  vi.stubEnv('NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL', 'http://localhost/graphql')
  vi.stubEnv(
    'NEXT_PUBLIC_WORDPRESS_REST_API_URL',
    'http://localhost/wp-json/wp/v2'
  )

  vi.spyOn(console, 'error').mockImplementation(() => {})
  vi.spyOn(console, 'warn').mockImplementation(() => {})
  vi.spyOn(console, 'info').mockImplementation(() => {})
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()

  if (globalThis.window !== undefined) {
    removeDomShims()
  }

  vi.unstubAllEnvs()
})
