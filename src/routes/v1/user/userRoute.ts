import { Request, Response, Router } from "express";
import middlewares from "../../../middlewares";
import {
  successResponse,
  defaultErrorResponse,
  errorResponse,
} from "../../../core/apiResponse";

import userValidationSchema from "./schema";
import { Container } from "typedi";
import UserService from "../../../services/User";
import logger from "../../../core/logger";

const userServiceInstance = Container.get(UserService);
const router = Router();

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const params = req.params;
    const data = await userServiceInstance.getUser(params.id);

    if (!data) {
      return res
        .status(404)
        .json(successResponse("User Not Found", {}, res.statusCode));
    }

    return res
      .status(200)
      .json(successResponse("Users Found Successfully", data, res.statusCode));
  } catch (err) {
    logger.error(err);
    return res.status(500).json(defaultErrorResponse());
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const data = await userServiceInstance.getAll();

    if (data.length < 1) {
      return res
        .status(404)
        .json(successResponse("User Not Found", data, res.statusCode));
    }

    return res
      .status(200)
      .json(successResponse("User Found Successfully", data, res.statusCode));
  } catch (err) {
    logger.error(err);
    return res.status(500).json(defaultErrorResponse());
  }
});

router.post(
  "/",
  middlewares.validation(userValidationSchema.createUser),
  async (req: Request, res: Response) => {
    try {
      const data = await userServiceInstance.createUser(req.body);
      return res
        .status(201)
        .json(
          successResponse("User Created Successfully", data, res.statusCode)
        );
    } catch (err) {
      logger.error(err);
      return res.status(500).json(defaultErrorResponse());
    }
  }
);

export default router;
