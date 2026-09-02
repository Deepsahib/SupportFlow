import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

type CustomError = Error & {
  statusCode?: number;
};

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    const errors = Object.fromEntries(
      err.issues.map((issue) => [issue.path.join("."), issue.message]),
    );

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong",
  });
};