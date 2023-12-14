const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://serpapi.com',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '', // rewrite path
    },
    onProxyReq: (proxyReq, req, res) => {
      // Remove the origin header
      proxyReq.removeHeader('Origin');
    },
  })
);
