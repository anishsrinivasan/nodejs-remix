import dotenv from "dotenv";
dotenv.config();

export const environment = process.env.NODE_ENV || "development";
export const PORT = process.env.PORT || 5000;

export const HTTPS_ENABLED =
  process.env.HTTPS_KEY && process.env.HTTPS_CERT ? true : false;
export const HTTPS_KEY = process.env.HTTPS_KEY || "";
export const HTTPS_CERT = process.env.HTTPS_CERT || "";

export const db = {
  name: process.env.DB_NAME || "",
  host: process.env.DB_HOST || "",
  port: process.env.DB_PORT || "",
  user: process.env.DB_USER || "",
  password: process.env.DB_USER_PWD || "",
};

export const tokenInfo = {
  accessTokenValidityDays: parseInt(
    process.env.ACCESS_TOKEN_VALIDITY_SEC || "0"
  ),
  refreshTokenValidityDays: parseInt(
    process.env.REFRESH_TOKEN_VALIDITY_SEC || "0"
  ),
  issuer: process.env.TOKEN_ISSUER || "",
  audience: process.env.TOKEN_AUDIENCE || "",
};

export const logDirectory = process.env.LOG_DIR;
