/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_WORDPRESS_URL],
    formats: ['image/avif', 'image/webp']
  }
}
