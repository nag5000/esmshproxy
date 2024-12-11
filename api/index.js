"use strict";

import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const apiProxy = createProxyMiddleware({
  target: "https://esm.sh",
  changeOrigin: true,
  followRedirects: true,
  on: {
    proxyReq: (proxyReq, req, res) => {
      console.log(res.headersSent);
      try {
        proxyReq.setHeader("Accept-Encoding", "gzip, br");
      } catch {}
    },
    proxyRes: (proxyRes, req, res) => {
      console.log(proxyRes.headers);
      // if (proxyRes.headers["content-encoding"]) {
      //   res.setHeader("content-encoding", proxyRes.headers["content-encoding"]);
      // }
    },
  },
});

const app = express();
app.use("/", apiProxy);
app.listen(process.env.PORT || 3000);

export default app;
