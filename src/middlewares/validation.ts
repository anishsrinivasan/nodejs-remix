import Joi from "joi";
import { pick } from "../helpers";
import { NextFunction, Request, Response } from "express";
import apiResponse from "../core/apiResponse";
import httpStatus from "http-status";

type ValidationOptions = {
  errorMessage?: string;
};

const validation =
  (schema: Object, { errorMessage }: ValidationOptions = {}) =>
  (req: Request, res: Response, next: NextFunction) => {
    const validSchema = pick(schema, ["params", "query", "body"]);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema).validate(object, {
      abortEarly: false,
    });

    if (error) {
      const errorDetails = error.details.map((details: any) => ({
        key: details.context.key,
        message: details.message,
      }));

      const message =
        errorMessage && errorMessage !== ""
          ? errorMessage
          : "Invalid Request | Required Values are Missing";

      return res
        .status(httpStatus.BAD_REQUEST)
        .json(
          apiResponse.errorResponse(message, res.statusCode, { errorDetails })
        );
    }
    Object.assign(req, value);
    return next();
  };

export default validation;
