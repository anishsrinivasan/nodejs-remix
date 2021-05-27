import "reflect-metadata";
import express from "express";
import loaders from "./loaders";
import logger from "./core/logger";
import serverClose from "./loaders/close";

import { PORT, HTTPS_ENABLED } from "./config";

async function startServer() {
  const app = express();
  const { httpServer } = await loaders({ expressApp: app });

  httpServer.listen(PORT, () => {
    logger.info(
      `⚡️[server]: Server is running at ${
        HTTPS_ENABLED ? "https" : "http"
      }://localhost:${PORT}`
    );
  });

  ["SIGINT", "SIGTERM", "SIGQUIT"].forEach((eventType) => {
    process.on(eventType, (err) => {
      if (err) {
        logger.error(err);
        process.exit(-1);
      }

      serverClose();
      httpServer.close();
      process.exit(1);
    });
  });
}

startServer();
