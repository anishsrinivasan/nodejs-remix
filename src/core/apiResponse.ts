// Helper code for the API consumer to understand the error and handle is accordingly
import logger from "../core/logger";

export const successResponse = (
  message: string,
  data: any,
  statusCode: number
) => {
  return {
    message,
    error: false,
    code: statusCode,
    data,
  };
};

export const defaultErrorResponse = (statusCode: number = 500) => {
  return errorResponse("Something Went Wrong, Try again", statusCode, {});
};

export const errorResponse = (
  message: string,
  statusCode: number,
  data: any = {}
) => {
  // List of common HTTP request code
  const codes = [200, 201, 400, 401, 404, 403, 422, 500];

  // Get matched code
  const findCode = codes.find((code) => code == statusCode);

  if (!findCode) statusCode = 500;
  else statusCode = findCode;
  logger.error(message);

  return {
    message,
    code: statusCode,
    error: true,
    data,
  };
};

export default { successResponse, errorResponse, defaultErrorResponse };
