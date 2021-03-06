import jwt from "../core/jwt";
import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../core/apiResponse";
import httpStatus from "http-status";

const getTokenFromHeader = (req: Request) => {
  /**
   * @TODO Edge and Internet Explorer do some weird things with the headers
   * So I believe that this should handle more 'edge' cases ;)
   */
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Token") ||
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

const isAuth = () => async (req: any, res: Response, next: NextFunction) => {
  try {
    const token = getTokenFromHeader(req);
    if (!token) {
      res
        .status(httpStatus.FORBIDDEN)
        .json(errorResponse("Access Denied", res.statusCode));
      res.end();
      return;
    }

    const decoded = await jwt.verify(token);
    req.currentUser = decoded;
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      res
        .status(httpStatus.FORBIDDEN)
        .json(
          errorResponse("Token Expired, Please try again.", res.statusCode)
        );

      res.end();
      return;
    }

    res
      .status(httpStatus.FORBIDDEN)
      .json(errorResponse("Access Denied", res.statusCode));
    res.end();
    return;
  }

  next();
};

export default isAuth;
