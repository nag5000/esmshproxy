"use strict";

import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const apiProxy = createProxyMiddleware({
  target: "https://esm.sh",
  changeOrigin: true,
  followRedirects: true,
});

const app = express();
app.use("/", apiProxy);
app.listen(process.env.PORT || 3000);

export default app;
