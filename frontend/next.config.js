/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "style-src 'self' 'unsafe-inline'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googleapis.com",
              "img-src 'self' data: https://*.googleapis.com https://*.gstatic.com",
              "font-src 'self' data:",
              "connect-src 'self' https://move-k987.onrender.com https://*.googleapis.com",
              "frame-src 'self' https://*.googleapis.com"
            ].join('; ')
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig 