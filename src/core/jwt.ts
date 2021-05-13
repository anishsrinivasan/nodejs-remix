import jwt from "jsonwebtoken";
import { jwt as jwtConfig } from "../config";
import logger from "./logger";

export default {
  sign: (payload: any, expiresIn: string | number) => {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        jwtConfig.jwtSecret,
        { expiresIn: expiresIn },
        (err, token) => {
          if (err) {
            logger.error(`JWT_SIGN_IN_ERR ${err}`);
            reject(err);
          } else {
            resolve(token);
          }
        }
      );
    });
  },
  verify(token: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        jwtConfig.jwtSecret,
        { algorithms: [jwtConfig.jwtAlgorithm] },
        (err, decoded) => {
          if (err) {
            reject(err);
          } else {
            resolve(decoded);
          }
        }
      );
    });
  },
  decode(token: string) {
    return jwt.decode(token, { complete: true });
  },
};
