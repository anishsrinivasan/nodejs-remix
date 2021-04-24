import { Router, Request, Response } from "express";
import middlewares from "../../../middlewares";
import userValidation from "./userValidation";

const router = Router();

router.get(
  "/me",
  middlewares.isAuth(),
  middlewares.validation(userValidation.createUser),
  (req: Request, res: Response) => {
    return res.json({ user: req.currentUser }).status(200);
  }
);

export default router;
