import { Request, Response, Router } from "express";
import middlewares from "../../../middlewares";
import { successResponse } from "../../../core/apiResponse";

import userValidationSchema from "./schema";
import { Container } from "typedi";
import UserService from "../../../services/User";
import OtpVerifyService from "../../../services/OtpVerify";
import { catchAsync } from "../../../helpers";
import httpStatus from "http-status";

const userServiceInstance = Container.get(UserService);
const otpVerifyServiceInstance = Container.get(OtpVerifyService);
const router = Router();

router.post(
  "/signin-phone-number",
  middlewares.validation(userValidationSchema.signInUserPhoneNumber),
  catchAsync(async (req: Request, res: Response) => {
    const data = await userServiceInstance.signInPhoneNumber(req.body);
    return res
      .status(data.statusCode || httpStatus.OK)
      .json(
        successResponse(
          data.statusMessage || "User Sign In Successful",
          res.statusCode,
          data
        )
      );
  })
);

router.post(
  "/signup-phone-number",
  middlewares.validation(userValidationSchema.signUpUserPhoneNumber),
  catchAsync(async (req: Request, res: Response) => {
    const data = await userServiceInstance.signUpPhoneNumber(req.body);
    return res
      .status(httpStatus.OK)
      .json(
        successResponse(
          "OTP has been sent successfully, Please Verify.",
          res.statusCode,
          data
        )
      );
  })
);

router.post(
  "/otp-verify",
  middlewares.validation(userValidationSchema.otpVerify),
  catchAsync(async (req: Request, res: Response) => {
    const data = await otpVerifyServiceInstance.otpVerify(req.body);
    return res
      .status(httpStatus.OK)
      .json(successResponse("OTP Verified Successfully", res.statusCode, data));
  })
);

router.post(
  "/resend-otp",
  middlewares.validation(userValidationSchema.resendOTP),
  catchAsync(async (req: Request, res: Response) => {
    const data = await otpVerifyServiceInstance.resendOTP(req.body);
    return res
      .status(httpStatus.OK)
      .json(successResponse("Resend OTP Successful", res.statusCode, data));
  })
);

router.get(
  "/:id",
  catchAsync(async (req: Request, res: Response) => {
    const params = req.params;
    const data = await userServiceInstance.getUser(params.id);

    return res
      .status(httpStatus.OK)
      .json(successResponse("Users Found Successfully", res.statusCode, data));
  })
);

router.get(
  "/",
  catchAsync(async (req: Request, res: Response) => {
    const data = await userServiceInstance.getAll();

    return res
      .status(httpStatus.OK)
      .json(successResponse("Users Found Successfully", res.statusCode, data));
  })
);

router.post(
  "/",
  middlewares.validation(userValidationSchema.createUser),
  catchAsync(async (req: Request, res: Response) => {
    const data = await userServiceInstance.createUser(req.body);
    return res
      .status(httpStatus.CREATED)
      .json(successResponse("User Created Successfully", res.statusCode, data));
  })
);

router.put(
  "/:userId",
  middlewares.validation(userValidationSchema.updateUser),
  catchAsync(async (req: Request, res: Response) => {
    const params = req.params;
    const data = await userServiceInstance.updateUser(params.userId, req.body);
    return res
      .status(httpStatus.OK)
      .json(successResponse("User Updated Successfully", res.statusCode, data));
  })
);

router.delete(
  "/:userId",
  middlewares.validation(userValidationSchema.deleteUser),
  catchAsync(async (req: Request, res: Response) => {
    const params = req.params;
    await userServiceInstance.deleteUser(params.userId);

    return res
      .status(httpStatus.OK)
      .json(successResponse("Users Deleted Successfully", res.statusCode));
  })
);

export default router;
