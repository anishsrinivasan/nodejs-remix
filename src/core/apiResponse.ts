import { Request, Response, NextFunction } from "express";
import logger from "../core/logger";
import httpStatus from "http-status";
// Helper code for the API consumer to understand the error and handle is accordingly

export const successResponse = (
  message: string,
  statusCode: number,
  data?: any | undefined | {}
) => {
  // Strip Duplicate Status Code & Message
  if (data) {
    delete data.statusCode;
    delete data.statusMessage;
  }

  return {
    message,
    code: statusCode,
    error: false,
    data: data || undefined,
  };
};

export const handleRouteCatch = (err: {
  errCode: number;
  message: string;
  statusCode: number;
  statusMessage: string;
}) => {
  const errCode = err.errCode || err.statusCode || 500;
  const message =
    err.message || err.statusMessage || "Something Went Wrong, Try Again";
  return { errCode, message };
};

export const errorResponse = (
  message: string,
  statusCode: number,
  data: any = {}
) => {
  return {
    message,
    statusCode,
    error: true,
    data,
  };
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { errCode, message } = handleRouteCatch(err);
  res.locals.errorMessage = err.message;

  if (errCode === 500) {
    logger.error(err);
    console.error(err);
  }

  if (err.code === "ER_DUP_ENTRY") {
    errCode = httpStatus.CONFLICT;
    message = "Duplicate - Entry Already Exist";
  }

  const response = {
    code: errCode,
    message,
  };

  res.status(errCode).send(response);
};

export class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(
    statusCode: number,
    message: string,
    isOperational = true,
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default {
  successResponse,
  errorResponse,
  errorHandler,
  ApiError,
};
