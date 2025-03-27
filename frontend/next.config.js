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
              // Definir política base mais permissiva
              "default-src *",
              // Permitir estilos inline e de fontes
              "style-src * 'unsafe-inline'",
              // Permitir scripts necessários
              "script-src * 'unsafe-inline' 'unsafe-eval'",
              // Permitir imagens de qualquer fonte
              "img-src * data: blob:",
              // Permitir fontes
              "font-src * data:",
              // Permitir conexões
              "connect-src * wss:",
              // Permitir frames
              "frame-src *",
              // Permitir workers
              "worker-src 'self' blob:",
              // Permitir mídia
              "media-src *"
            ].join('; ')
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
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