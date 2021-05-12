import { Request, Response, Router } from "express";
import middlewares from "../../../middlewares";
import {
  successResponse,
  errorResponse,
  handleRouteCatch,
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
        .json(successResponse("User Not Found", res.statusCode, {}));
    }

    return res
      .status(200)
      .json(successResponse("Users Found Successfully", res.statusCode, data));
  } catch (err) {
    logger.error(err);
    const errResponse = handleRouteCatch(err);
    return res
      .status(errResponse.errCode)
      .json(errorResponse(errResponse.message, res.statusCode));
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const data = await userServiceInstance.getAll();

    if (data.length < 1) {
      return res
        .status(404)
        .json(successResponse("User Not Found", res.statusCode, data));
    }

    return res
      .status(200)
      .json(successResponse("User Found Successfully", res.statusCode, data));
  } catch (err) {
    logger.error(err);
    const errResponse = handleRouteCatch(err);
    return res
      .status(errResponse.errCode)
      .json(errorResponse(errResponse.message, res.statusCode));
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
          successResponse("User Created Successfully", res.statusCode, data)
        );
    } catch (err) {
      logger.error(err);
      const errResponse = handleRouteCatch(err);
      return res
        .status(errResponse.errCode)
        .json(errorResponse(errResponse.message, res.statusCode));
    }
  }
);

router.put(
  "/:userId",
  middlewares.validation(userValidationSchema.updateUser),
  async (req: Request, res: Response) => {
    try {
      const params = req.params;
      const data = await userServiceInstance.updateUser(
        params.userId,
        req.body
      );
      return res
        .status(201)
        .json(
          successResponse("User Updated Successfully", res.statusCode, data)
        );
    } catch (err) {
      logger.error(err);
      const errResponse = handleRouteCatch(err);
      return res
        .status(errResponse.errCode)
        .json(errorResponse(errResponse.message, res.statusCode));
    }
  }
);

router.delete(
  "/:userId",
  middlewares.validation(userValidationSchema.deleteUser),
  async (req: Request, res: Response) => {
    try {
      const params = req.params;
      const data = await userServiceInstance.deleteUser(params.userId);

      if (!data.isDeleted) {
        return res
          .status(404)
          .json(
            errorResponse("User Not Found, Delete Failed", res.statusCode, {})
          );
      }

      return res
        .status(200)
        .json(
          successResponse("Users Deleted Successfully", res.statusCode, data)
        );
    } catch (err) {
      logger.error(err);
      const errResponse = handleRouteCatch(err);
      return res
        .status(errResponse.errCode)
        .json(errorResponse(errResponse.message, res.statusCode));
    }
  }
);

export default router;
