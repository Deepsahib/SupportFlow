import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError.js";
import { verifyJwt } from "../../modules/auth/token.service.js";


type JwtPayload = {
  userId: string;
};

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(AppError("Unauthorized", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded =verifyJwt(token) as JwtPayload;

    req.user = {
        userId:decoded.userId
    };

    next();
  } catch {
    next(AppError("Invalid or expired token", 401));
  }
};