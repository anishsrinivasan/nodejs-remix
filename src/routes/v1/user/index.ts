import { Router, Request, Response } from "express";
import middlewares from "../../../middlewares";
import userValidationSchema from "./schema";
import logger from "../../../core/logger";
import { successResponse, errorResponse } from "../../../core/apiResponse";

const router = Router();

router.get("/me", middlewares.isAuth(), (req: Request, res: Response) => {
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
});

router.get(
  "/valid",
  middlewares.validation(userValidationSchema.createUser),
  (req: Request, res: Response) => {
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
  }
);

router.post(
  "/",
  middlewares.validation(userValidationSchema.createUser),
  (req: Request, res: Response) => {
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
  }
);

export default router;
