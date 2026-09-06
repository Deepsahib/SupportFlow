import { NextFunction, Request, Response } from "express";
import { AppError } from "../../common/errors/AppError.js";
import { createWorkspace, getUserWorkspace, getWorkspace } from "./workspace.service.js";

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

export const getUserWorkspaceController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      throw AppError("User not authenticated", 401);
    }

    const userWorkspaces = await getUserWorkspace(userId);
    console.log("userWorkspaceid",userWorkspaces)

    return res.status(200).json({
      success: true,
      data: userWorkspaces,
    });
  } catch (error) {
    next(error);
  }
};

export const getWorkspaceController=async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const workspace=getWorkspace(req.params.workspaceId);
    if (!workspace) {
      throw AppError("Workspace not found", 404);
    }

    return res.status(200).json({
      success: true,
      data: workspace,
    });
  } catch (error) {
    next(error);
  }
}