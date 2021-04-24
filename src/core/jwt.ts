import jwt from "jsonwebtoken";
import { jwt as jwtConfig } from "../config";

export default {
  sign: (payload: any, expiresIn: string | number) => {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        jwtConfig.jwtSecret,
        { expiresIn: expiresIn, algorithm: jwtConfig.jwtAlgorithm },
        (err, token) => {
          if (err) {
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
