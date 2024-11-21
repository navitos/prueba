/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'example.com',
      'localhost',
      'png.pngtree.com',
      'i.imgur.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',

      },
    ]
  }
}

module.exports = nextConfig