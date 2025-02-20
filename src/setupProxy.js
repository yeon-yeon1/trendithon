const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // ✅ `/api`로 시작하는 요청을 프록시
    createProxyMiddleware({
      target: "http://3.34.183.9:8080", // ✅ 백엔드 서버 주소
      changeOrigin: true,
      secure: false,
    })
  );
};
