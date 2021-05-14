import * as express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import routesV1 from "../routes/v1";
import logger from "../core/logger";
import { errorHandler } from "../core/apiResponse";
declare global {
  namespace Express {
    interface Request {
      currentUser: any;
    }
  }
}

export default async ({ app }: { app: express.Application }) => {
  app.use(bodyParser.json({ limit: "10mb" }));
  app.use(
    bodyParser.urlencoded({
      limit: "10mb",
      extended: true,
      parameterLimit: 50000,
    })
  );
  app.use(cors());
  app.use("/v1", routesV1);
  app.use(errorHandler);
  logger.info("Express Initialized");

  return app;
};
