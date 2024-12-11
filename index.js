"use strict";

import Fastify from "fastify";
import proxy from "@fastify/http-proxy";

const app = Fastify();

app.register(proxy, {
  upstream: "https://esm.sh",
});

export default async function handler(req, res) {
  await app.ready();
  app.server.emit("request", req, res);
}

// app.listen({ port: 3000 });
