import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  skipMiddlewareUrlNormalize: true,
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },

  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, './src'),
    };
    return config;
  },

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/proxy/:path*',
          destination: 'http://localhost:8080/:path*',
        },
      ],
    };
  },

  onDemandEntries: {
    maxInactiveAge: 60 * 10 * 1000,
    pagesBufferLength: 5,
  },
};

export default nextConfig;
