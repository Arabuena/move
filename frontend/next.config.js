/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  async headers() {
    return [
      {
        // Aplicar headers para todas as rotas
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
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
  }
}

module.exports = nextConfig 