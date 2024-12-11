"use strict";

import Fastify from "fastify";
import proxy from "@fastify/http-proxy";

const app = Fastify();

app.register(proxy, {
  upstream: "https://esm.sh",
  replyOptions: {
    onResponse: (req, reply, res) => {
      // handle redirects
      if (
        [301, 302, 303, 307].includes(res.statusCode) &&
        res.headers["location"]
      ) {
        reply.redirect(res.headers["location"]);
      } else {
        reply.send(res);
      }
    },
  },
});

export default async function handler(req, reply) {
  await app.ready();
  app.server.emit("request", req, reply);
}

// app.listen({ port: 3000 });
