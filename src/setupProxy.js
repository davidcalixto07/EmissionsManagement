const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/emissionsapi2-colwest2/v1/',
    createProxyMiddleware({
      target: 'http://127.0.0.1:9099',
      pathRewrite: {
        '^/api/emissionsapi2-colwest2/v1/': '', // Cut the path to redirect to the endpoint
      },
      changeOrigin: true,
      changeOrigin: true,
    })
  );

  app.use(
    '/api/',
    createProxyMiddleware({
      target: 'http://127.0.0.1:5500',
      changeOrigin: true,
    })
  );
};