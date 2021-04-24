import Joi from "joi";
import { pick } from "../helpers";
import { NextFunction, Request, Response } from "express";
import apiResponse from "../core/apiResponse";

type ValidationOptions = {
  errorMessage?: string;
};

const validation = (
  schema: Object,
  { errorMessage }: ValidationOptions = {}
) => (req: Request, res: Response, next: NextFunction) => {
  const validSchema = pick(schema, ["params", "query", "body"]);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema).validate(object, {
    abortEarly: false,
  });

  if (error) {
    // const errorMessageValues = error.details
    //   .map((details: any) => details.message)
    //   .join(", ");

    const message =
      errorMessage && errorMessage !== ""
        ? errorMessage
        : "Please Enter the Required values.";

    return res
      .status(422)
      .json(apiResponse.errorResponse(message, res.statusCode));
  }
  Object.assign(req, value);
  return next();
};

export default validation;
