/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: false,
  output: "export",
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = config;
