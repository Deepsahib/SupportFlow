import { NextFunction, Request, Response } from "express";
import { AppError } from "../../common/errors/AppError.js";
import { createWorkspace, getUserWorkspace } from "./workspace.service.js";

export const createWorkspaceController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.userId;
    const { name, slug } = req.body;

    if (!userId) {
      throw AppError("user is not present", 400);
    }

    const createdWorkspace = await createWorkspace(userId, name, slug);

    return res.status(201).json({
      success: true,
      data: createdWorkspace,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserWorkspaceController = (req: Request, res: Response, next: NextFunction) => {
  const workspaceId: any = req.user.userId;

  if (!workspaceId) {
    throw AppError("User not authenticated", 400)
  }

  const userWorkspace = getUserWorkspace(workspaceId);
}