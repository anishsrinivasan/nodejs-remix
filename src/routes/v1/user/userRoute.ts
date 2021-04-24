import { Router } from "express";
import middlewares from "../../../middlewares";
import userValidationSchema from "./schema";
import userController from "./userController";

const router = Router();

router.get("/me", userController.getCurrentUser);

router.get(
  "/valid",
  middlewares.validation(userValidationSchema.createUser),
  userController.validate
);

router.post(
  "/",
  middlewares.validation(userValidationSchema.createUser),
  userController.createUser
);

export default router;
