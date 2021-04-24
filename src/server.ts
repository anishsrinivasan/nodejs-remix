import express from "express";
import loaders from "./loaders";

import { PORT, HTTPS_ENABLED } from "./config";

async function startServer() {
  const app = express();
  const { httpServer } = await loaders({ expressApp: app });

  httpServer.listen(PORT, () => {
    console.log(
      `⚡️[server]: Server is running at ${
        HTTPS_ENABLED ? "https" : "http"
      }://localhost:${PORT}`
    );
  });
}

startServer();
