/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_WORDPRESS_URL
      },
      {
        protocol: 'https',
        hostname: '**.gravatar.com'
      },
      {
        protocol: 'http',
        hostname: 'localhost'
      },
      {
        protocol: 'http',
        hostname: '**.gravatar.com'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/homepage',
        destination: '/',
        permanent: true
      }
    ]
  }
}
