/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wordpress.nextjswp.com'
      },
      {
        protocol: 'https',
        hostname: '**.gravatar.com'
      }
    ]
  },
  swcMinify: true,
  outputFileTracing: true,
  experimental: {
    turbotrace: {
      logLevel: 'fatal',
      logDetail: true,
      logAll: false
    }
  },
  logging: {
    fetches: {
      fullUrl: true
    }
  }
}

module.exports = nextConfig
