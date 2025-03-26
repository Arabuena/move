/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Gera build estático
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  distDir: 'out'
}

module.exports = nextConfig 