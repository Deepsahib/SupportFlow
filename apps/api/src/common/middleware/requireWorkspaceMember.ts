import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { Membership } from "../../modules/memberships/membership.model.js";
import { MembershipStatus } from "../../modules/memberships/membership.types.js";
import { AppError } from "../errors/AppError.js";

export const workspaceMember = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.userId;
    const rawWorkspaceId = req.params.workspaceId ?? req.params.workSpaceId;
    const workspaceId = Array.isArray(rawWorkspaceId) ? rawWorkspaceId[0] : rawWorkspaceId;

    if (!userId) {
      return next(AppError("Unauthorized", 401));
    }

    if (!workspaceId || !mongoose.Types.ObjectId.isValid(workspaceId)) {
      return next(AppError("Workspace id is required", 400));
    }

    const membership = await Membership.findOne({
      userId: new mongoose.Types.ObjectId(userId),
      workspaceId: new mongoose.Types.ObjectId(workspaceId),
      status: MembershipStatus.ACTIVE,
    });

    if (!membership) {
      return next(AppError("You do not have access to this workspace", 400));
    }

    req.membership = membership;
    return next();
  } catch (error) {
    return next(error);
  }
};