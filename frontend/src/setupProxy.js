const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `tester:${process.env.PORT}`,
      changeOrigin: true,
    })
  );
};