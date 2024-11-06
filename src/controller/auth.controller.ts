import { NextFunction, Request, Response } from "express";
import { formatResponse } from "../utils";
import SAuth from "../services/auth/auth.service";

const CLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json(formatResponse(400, "Bad Request", null));
    return;
  }

  try {
    const { accessToken, refreshToken } = await SAuth.login(username, password);

    res.json(formatResponse(200, "Success", { accessToken, refreshToken }));
  } catch (error) {
    next(error);
  }
};

const CRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json(formatResponse(400, "Bad Request", null));
    return;
  }

  try {
    const newUser = await SAuth.register(username, password);

    res.json(formatResponse(200, "Success", newUser));
  } catch (error: any) {
    next(error);
  }
};

const CRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(400).json(formatResponse(400, "Bad Request", null));
    return;
  }

  try {
    const accessToken = await SAuth.refreshToken(refreshToken);

    res.json(formatResponse(200, "Success", { accessToken }));
  } catch (error) {
    next(error);
  }
};

export { CLogin, CRegister, CRefreshToken };
