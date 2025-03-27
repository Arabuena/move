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
              // Permitir recursos do mesmo domínio e do chat
              "default-src 'self'",
              // Permitir todos os estilos necessários
              "style-src * 'unsafe-inline'",
              // Permitir scripts necessários
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.googleapis.com https://*.crisp.chat",
              // Permitir imagens de várias fontes
              "img-src 'self' blob: data: https://*.googleapis.com https://*.gstatic.com https://*.crisp.chat",
              // Permitir fontes
              "font-src 'self' data: https://fonts.gstatic.com",
              // Permitir conexões
              "connect-src 'self' https://*.googleapis.com https://move-k987.onrender.com/api wss://*.crisp.chat",
              // Permitir iframes
              "frame-src 'self' https://*.googleapis.com https://*.crisp.chat",
              // Permitir workers
              "worker-src 'self' blob:",
              // Permitir child frames
              "child-src blob:",
              // Restringir formulários ao mesmo domínio
              "form-action 'self'",
              // Permitir manifesto PWA
              "manifest-src 'self'",
              // Permitir mídia do chat
              "media-src 'self' https://*.crisp.chat",
              // Bloquear objetos
              "object-src 'none'"
            ].join('; ')
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
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