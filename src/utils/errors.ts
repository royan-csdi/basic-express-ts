import { CustomError } from "../interfaces";

export function createError(message: string, statusCode: number): CustomError {
  const error: CustomError = new Error(message);
  error.statusCode = statusCode;
  return error;
}
