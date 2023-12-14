/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: false,
  output: 'export',
  transpilePackages: [
    '@acme/ui',
    '@mui/x-charts',
    '@nivo/line',
    '@d3-interpolate',
    '@nivo/core',
    '@nivo',
    'd3-color',
    'mui-one-time-password-input',
  ],

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = config;
