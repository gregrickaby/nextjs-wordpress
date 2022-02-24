/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['gregrickaby.test'],
    formats: ['image/avif', 'image/webp']
  }
}
