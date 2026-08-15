/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://cdn.discordapp.com",
      "connect-src 'self'",
      "font-src 'self'",
      "frame-ancestors 'self'",
    ].join('; '),
  },
]

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@rkr/dls'],
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
}

module.exports = nextConfig
