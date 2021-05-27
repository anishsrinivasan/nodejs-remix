import * as express from "express";
import expressLoader from "./express";
import socketLoader from "./socket";
import typeormLoader from "./typeorm";
import bullMQLoader from "./bullmq";

import http from "http";
import https from "https";
import fs from "fs";
import path from "path";
import { HTTPS_KEY, HTTPS_CERT, HTTPS_ENABLED } from "./../config";
import logger from "../core/logger";

export default async ({ expressApp }: { expressApp: express.Application }) => {
  let httpServer;
  if (HTTPS_ENABLED) {
    const httpsOptions = {
      key: fs.readFileSync(path.resolve(__dirname, "..", HTTPS_KEY)),
      cert: fs.readFileSync(path.resolve(__dirname, "..", HTTPS_CERT)),
    };
    httpServer = https.createServer(httpsOptions, expressApp);
  } else {
    httpServer = http.createServer(expressApp);
  }

  logger.info("Default Loaders Initiating \n");
  await typeormLoader({});
  bullMQLoader({ app: expressApp });

  expressLoader({ app: expressApp });
  socketLoader({ httpServer });
  logger.info("Default Loaders Initialized\n");
  return { httpServer };
};
