import "reflect-metadata";
import { createConnection } from "typeorm";
import logger from "../core/logger";

export default ({}) => {
  createConnection()
    .then(async (connection) => {
      logger.info("DB Established Successful");
    })
    .catch((error) => logger.error("typeOrmErr", error));
};
