/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['move-k987.onrender.com']
  },
  experimental: {
    turbotrace: {
      logLevel: 'error'
    }
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              // Permitir recursos do mesmo domínio e do chat
              "default-src 'self' https://*.crisp.chat wss://*.crisp.chat",
              // Permitir todos os estilos necessários
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.crisp.chat",
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
  basePath: '',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://move-k987.onrender.com/api/:path*'
      }
    ]
  },
  // Configuração para fallback de páginas
  async redirects() {
    return [
      {
        source: '/',
        destination: '/passenger/login',
        permanent: false,
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
};

module.exports = nextConfig; 