// Helper code for the API consumer to understand the error and handle is accordingly

export const successResponse = (
  message: string,
  statusCode: number,
  data: any
) => {
  return {
    message,
    error: false,
    code: statusCode,
    data,
  };
};

export const handleRouteCatch = (err: { errCode: number; message: string }) => {
  const errCode = err.errCode || 500;
  const message = err.message || "Something went wrong";
  return { errCode, message };
};

export const defaultErrorResponse = (
  message = "Something Went Wrong, Try again",
  statusCode: number = 500
) => {
  return errorResponse(message, statusCode, {});
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

  return {
    message,
    code: statusCode,
    error: true,
    data,
  };
};

export default { successResponse, errorResponse, defaultErrorResponse };
