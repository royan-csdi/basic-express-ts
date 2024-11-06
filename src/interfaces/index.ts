import { IUser } from "./user.interface";

interface CustomError extends Error {
  statusCode?: number;
}

export { IUser, CustomError };
