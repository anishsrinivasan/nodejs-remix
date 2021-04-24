import { successResponse, errorResponse } from "../../../core/apiResponse";
import { Request, Response } from "express";
import logger from "../../../core/logger";

const getCurrentUser = (req: Request, res: Response) => {
  try {
    return res
      .status(200)
      .json(
        successResponse("Success", { user: req.currentUser }, res.statusCode)
      );
  } catch (err) {
    logger.error("User Requested Err", err);
    return res
      .status(500)
      .json(errorResponse("Something Went Wrong, Try Again", res.statusCode));
  }
};

const validate = (req: Request, res: Response) => {
  try {
    return res
      .status(200)
      .json(successResponse("Success", { user: {} }, res.statusCode));
  } catch (err) {
    logger.error("User Requested Err", err);
    return res
      .status(500)
      .json(errorResponse("Something Went Wrong, Try Again", res.statusCode));
  }
};

const createUser = (req: Request, res: Response) => {
  try {
    return res
      .status(200)
      .json(successResponse("User Created", { user: {} }, res.statusCode));
  } catch (err) {
    logger.error("User Created Err", err);
    return res
      .status(500)
      .json(errorResponse("Something Went Wrong, Try Again", res.statusCode));
  }
};

export default {
  getCurrentUser,
  validate,
  createUser,
};
