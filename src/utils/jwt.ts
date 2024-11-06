import jwt from "jsonwebtoken";
import { env } from "../config";

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, env.ACCESS_TOKEN_SECRET, {
    expiresIn: env.ACCESS_TOKEN_EXPIRY,
  });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, env.REFRESH_TOKEN_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRY,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};
