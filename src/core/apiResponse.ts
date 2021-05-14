// Helper code for the API consumer to understand the error and handle is accordingly

export const successResponse = (
  message: string,
  statusCode: number,
  data: any
) => {
  // Strip Duplicate Status Code & Message
  delete data.statusCode;
  delete data.statusMessage;

  return {
    message,
    error: false,
    code: statusCode,
    data,
  };
};

export const handleRouteCatch = (err: {
  errCode: number;
  message: string;
  statusCode: number;
  statusMessage: string;
}) => {
  const errCode = err.errCode || err.statusCode || 500;
  const message = err.message || err.statusMessage || "Something went wrong";
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
  return {
    message,
    statusCode,
    error: true,
    data,
  };
};

export default { successResponse, errorResponse, defaultErrorResponse };
