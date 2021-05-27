import "reflect-metadata";
import { createConnection } from "typeorm";
import logger from "../core/logger";

export default ({}) => {
  return new Promise((resolve, reject) => {
    createConnection()
      .then(async (connection) => {
        logger.info("DB Established Successful");
        resolve(connection);
      })
      .catch((error) => {
        logger.error("typeOrmErr", error);
        reject(error);
      });
  });
};
