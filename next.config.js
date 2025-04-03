/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/a/**',
      }
    ]
  },
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  distDir: '.next',
  generateBuildId: async () => {
    return 'build'
  },
  assetPrefix: '',
  headers: () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Content-Security-Policy', value: "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; img-src 'self' https://lh3.googleusercontent.com data:" }
      ],
    },
    {
      source: '/_next/static/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        { key: 'Content-Type', value: 'application/javascript; charset=utf-8' }
      ],
    },
    {
      source: '/_next/static/css/(.*)',
      headers: [
        { key: 'Content-Type', value: 'text/css; charset=utf-8' }
      ],
    }
  ],
}

module.exports = nextConfig
