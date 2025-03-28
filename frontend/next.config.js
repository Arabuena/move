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
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://move-app.onrender.com/api/:path*'
      }
    ]
  }
};

module.exports = nextConfig; 