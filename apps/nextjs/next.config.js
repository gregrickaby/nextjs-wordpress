/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: process.env.VERCEL_ENV === 'production' ? 'https' : 'http',
        hostname:
          process.env.VERCEL_ENV === 'production'
            ? process.env.NEXT_PUBLIC_WORDPRESS_URL
            : 'localhost'
      },
      {
        protocol: process.env.VERCEL_ENV === 'production' ? 'https' : 'http',
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
