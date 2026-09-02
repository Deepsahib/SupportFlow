import type { NextFunction, Request, Response } from "express";
import {
  registerUser,
  loginUser,
  getUser,
  refreshAccessToken,
  logoutUser,
} from "./auth.service.js";
import { loginUserSchema, registerUserSchema } from "./user.schema.js";
import { AppError } from "../../common/errors/AppError.js";

export const registerUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const input = registerUserSchema.parse(req.body);
    const user = await registerUser(input);

    return res.status(201).json({
      success: true,
      message: "User created Successfully",
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};

export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const input = loginUserSchema.parse(req.body);
    const user = await loginUser(input);
    
    res.cookie("refreshtoken", user.refreshtoken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "User created Successfully",
      data:user.user,
    });
  } catch (error: any) {
    return next(error);
  }
};

export const refreshTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const refreshToken = req.cookies?.refreshtoken ?? req.body?.refreshToken;
    if (!refreshToken) {
      throw AppError("Refresh token is required", 401);
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await refreshAccessToken(refreshToken);

    res.cookie("refreshtoken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ success: true, accessToken });
  } catch (error) {
    return next(error);
  }
};

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const refreshToken = req.cookies?.refreshtoken;
    if (!refreshToken) {
      throw AppError("Refresh token is required", 401);
    }

    await logoutUser(refreshToken);

    res.clearCookie("refreshtoken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return next(error);
  }
};

export const getMeController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userid = req.user?.userId;
    if (!userid) {
      throw AppError("No token has been found", 400);
    }
    const user = await getUser(userid);

    return res.status(200).json({
      success: true,
      message: "Checking authentication worked really good",
      data: user,
    });
  } catch (error: any) {
    return next(error);
  }
};
