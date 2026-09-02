import { NextFunction, Request, Response } from "express";
import { MembershipRole } from "../../modules/memberships/membership.types.js";
import { AppError } from "../errors/AppError.js";

export const authorizeRoles = (...allowedRoles: MembershipRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const membership = req.membership;

    if (!membership) {
      return next(AppError("Forbidden", 403));
    }

    if (allowedRoles.includes(membership.role)) {
      return next();
    }

    return next(AppError("Forbidden", 403));
  };
};
