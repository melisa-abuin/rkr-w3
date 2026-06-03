/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/proxy/:path*',
        destination: `${process.env.API_URL_NEW}/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
