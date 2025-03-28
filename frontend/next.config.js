/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['move-k987.onrender.com']
  },
  output: 'export',
  trailingSlash: true,
  experimental: {
    turbotrace: {
      logLevel: 'error'
    }
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://move-k987.onrender.com/api/:path*'
      }
    ]
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