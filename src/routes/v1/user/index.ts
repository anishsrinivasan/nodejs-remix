import { Router, Request, Response } from "express";
import middlewares from "../../../middlewares";
import userValidation from "./userValidation";
import logger from "../../../core/logger";

const router = Router();

router.get("/me", (req: Request, res: Response) => {
  try {
    logger.info("User Requested");
    return res.json({ message: "Success", data: { user: {} } }).status(200);
  } catch (err) {
    logger.error("User Requested Err", err);
    return res
      .json({ message: "Something went wrong, Try again." })
      .status(500);
  }
});

router.post(
  "/",
  middlewares.validation(userValidation.createUser),
  (req: Request, res: Response) => {
    try {
      logger.info("Create User");
      return res
        .json({ message: "User Created", data: { user: {} } })
        .status(200);
    } catch (err) {
      logger.error("User Created Err", err);
      return res.json({ message: "Something Went Wrong" }).status(500);
    }
  }
);

export default router;
