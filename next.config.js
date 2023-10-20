/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
  }
}

module.exports = nextConfig
