/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Gera build estático
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  distDir: 'out'  // Diretório de saída do build
}

module.exports = nextConfig 