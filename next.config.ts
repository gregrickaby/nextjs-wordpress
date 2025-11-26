import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.nextjswp.**'
      },
      {
        protocol: 'https',
        hostname: '*.gravatar.**'
      }
    ]
  },
  logging: {
    fetches: {
      fullUrl: true
    }
  }
}

export default nextConfig
