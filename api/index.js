"use strict";

import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const apiProxy = createProxyMiddleware({
  target: "https://esm.sh",
  changeOrigin: true,
  followRedirects: true,
  on: {
    proxyReq: (proxyReq, req, res) => {
      if (!proxyReq._isRedirect) {
        // Vercel Edge Network doesn't support zstd
        // https://vercel.com/docs/edge-network/compression
        proxyReq.setHeader("Accept-Encoding", "gzip, br");
      }
    },
  },
});

const app = express();
app.use("/", apiProxy);
app.listen(process.env.PORT || 3000);

export default app;
