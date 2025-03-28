/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'move-k987.onrender.com'
      }
    ]
  },
  output: 'export',
  trailingSlash: true,
  experimental: {
    // Otimizações para build estática
    optimizeFonts: true,
    optimizeImages: true,
    scrollRestoration: true
  },
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