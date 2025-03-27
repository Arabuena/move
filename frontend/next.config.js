/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['move-k987.onrender.com']
  },
  async headers() {
    return [
      {
        // Aplicar headers para todas as rotas
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "base-uri 'self'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.crisp.chat",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.googleapis.com https://*.crisp.chat",
              "img-src 'self' blob: data: https://*.googleapis.com https://*.gstatic.com https://*.crisp.chat",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' wss://*.crisp.chat https://*.googleapis.com https://move-k987.onrender.com/api",
              "frame-src 'self' https://*.googleapis.com https://*.crisp.chat",
              "worker-src 'self' blob:",
              "child-src blob:",
              "form-action 'self'",
              "manifest-src 'self'",
              "media-src 'self' https://*.crisp.chat",
              "object-src 'none'"
            ].join('; ')
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ]
  },
  // Configuração para o Render.com
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://move-k987.onrender.com/api/:path*'
      }
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });
    return config;
  }
}

module.exports = nextConfig 