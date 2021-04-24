import Joi from "joi";
import { pick } from "../helpers";
import { NextFunction, Request, Response } from "express";

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
    const errorMessageValues = error.details
      .map((details: any) => details.message)
      .join(", ");

    return res
      .json({
        code: 422,
        msg:
          errorMessage && errorMessage !== ""
            ? errorMessage
            : "Please Enter the Required values.",
      })
      .status(422);
  }
  Object.assign(req, value);
  return next();
};

export default validation;
