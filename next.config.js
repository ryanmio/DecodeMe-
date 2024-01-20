// next.config.js
/** @type {import('next').NextConfig} */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const nextConfig = {
  webpack(config, { isServer }) {
    if (process.env.ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: isServer ? '../analyze/server.html' : './analyze/client.html',
          openAnalyzer: true,
        })
      );
    }
    return config;
  },
};

module.exports = nextConfig;