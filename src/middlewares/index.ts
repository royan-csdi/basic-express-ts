import { Request, Response, NextFunction, RequestHandler } from "express";
import { formatResponse, verifyToken } from "../utils";
import { env } from "../config";
import { JwtPayload } from "jsonwebtoken";

const apikeyValidator: RequestHandler = (req, res, next) => {
  const { apikey } = req.headers;

  if (apikey !== env.API_KEY) {
    res.json(formatResponse(401, "Unauthorized", null));
    return;
  }
  return next();
};

const validateRequest: RequestHandler = (req, res, next) => {
  const { valueA, valueB, operation } =
    req.method === "POST"
      ? req.body
      : {
          valueA: req.query.valueA || req.params.valueA,
          valueB: req.query.valueB || req.params.valueB,
          operation: req.query.operation || req.params.operation,
        };

  const validOperations = ["add", "subtract", "multiply", "divide"];

  if (!validOperations.includes(operation)) {
    res.json(formatResponse(400, "Invalid operation", null));
    return;
  }

  if (isNaN(Number(valueA)) || isNaN(Number(valueB))) {
    res.json(formatResponse(400, "Both values must be numbers", null));
    return;
  }

  return next();
};

const checkAuth: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.json(formatResponse(401, "Unauthorized", null));
    return;
  }

  const verify = verifyToken(token, env.ACCESS_TOKEN_SECRET);

  if (!verify) {
    if (verify === null) {
      res.status(403).json(formatResponse(403, "Token expired", null));
    } else {
      res.status(401).json(formatResponse(401, "Unauthorized", null));
    }
    return;
  }

  return next();
};

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json(formatResponse(statusCode, message, null));
};

const errorHandlerSimple = (
  err: any,
  req: Request,
  res: Response,
  next: Function
) => {
  res.status(500).json(formatResponse(500, err.message, null));
};

export {
  validateRequest,
  apikeyValidator,
  checkAuth,
  errorHandler,
  errorHandlerSimple,
};
