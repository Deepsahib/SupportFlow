import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";


export const notFound = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(AppError(`Route ${req.originalUrl} not found`, 404));
};