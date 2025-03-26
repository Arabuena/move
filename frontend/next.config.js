/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Gera build estático
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  distDir: 'out',  // Diretório de saída do build
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  }
}

module.exports = nextConfig 