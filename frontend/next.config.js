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
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.crisp.chat",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.googleapis.com https://*.crisp.chat",
              "img-src 'self' blob: data: https://*.googleapis.com https://*.gstatic.com https://*.crisp.chat",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' https://*.googleapis.com https://move-k987.onrender.com/api wss://*.crisp.chat",
              "frame-src 'self' https://*.googleapis.com https://*.crisp.chat",
              "worker-src 'self' blob:",
              "child-src blob:",
              "form-action 'self'",
              "manifest-src 'self'",
              "media-src 'self' https://*.crisp.chat",
              "object-src 'none'",
              "default-src 'self' https://*.crisp.chat wss://*.crisp.chat"
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