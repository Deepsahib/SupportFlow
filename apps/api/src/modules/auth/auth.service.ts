import { LoginInput, registerInput } from "./user.schema.js";
import { User } from "../users/user.model.js";
import { AppError } from "../../common/errors/AppError.js";
import { comparePassword, hashPassword } from "./password.service.js";
import { generateAccessToken, generateRefreshToken } from "./token.service.js";
import { verifyRefreshToken } from "./token.service.js";
import { Session } from "../sessions/session.model.js";

export const registerUser = async (input: registerInput) => {
  const { name, email, password } = input;
  const isEmailExists = await User.findOne({ email });
  if (isEmailExists) {
    throw AppError("Email has already been exist", 409);
  }
  const passwordHash = await hashPassword(password);
  const user = await User.create({
    name,
    email,
    passwordHash,
  });
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    isVerified: user.isVerified,
  };
};

export const loginUser = async (input: LoginInput) => {
  const { email, password } = input;
  const checkUser = await User.findOne({ email }).select("+passwordHash");

  if (!checkUser) {
    throw AppError("Invalid email or password", 400);
  }
  const isPassworrdValid = await comparePassword(
    password,
    checkUser.passwordHash,
  );
  if (!isPassworrdValid) {
    throw AppError("Invalid credentials", 500);
  }

  const accesstoken = generateAccessToken(checkUser._id.toString());
  const refreshtoken = generateRefreshToken(checkUser._id.toString());

  const refreshTokenHash = await hashPassword(refreshtoken);
  const refreshPayload = verifyRefreshToken(refreshtoken) as { exp?: number };

  await Session.create({
    userId: checkUser._id,
    refreshTokenHash,
    expiresAt: new Date((refreshPayload.exp ?? 0) * 1000),
  });

  return {
    user: {
      id: checkUser._id,
      name: checkUser.name,
      email: checkUser.email,
      isVerified: checkUser.isVerified,
      accesstoken,
    },
    refreshtoken,
  };
};

export const getUser = async (userId: string) => {
  console.log("came here");
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw AppError("No user has been found", 400);
  }
  return user;
};

export const refreshAccessToken = async (refreshToken: string) => {
  let payload: { userId?: string; exp?: number };

  try {
    payload = verifyRefreshToken(refreshToken) as {
      userId?: string;
      exp?: number;
    };
  } catch {
    throw AppError("Invalid or expired refresh token", 401);
  }

  if (!payload.userId) {
    throw AppError("Invalid refresh token", 401);
  }

  const activeSessions = await Session.find({
    userId: payload.userId,
    revokedAt: null,
    expiresAt: { $gt: new Date() },
  }).select("+refreshTokenHash");

  for (const session of activeSessions) {
    const isMatchingSession = await comparePassword(
      refreshToken,
      session.refreshTokenHash,
    );

    if (isMatchingSession) {
      const revoked = await Session.updateOne(
        { _id: session._id, revokedAt: null },
        { $set: { revokedAt: new Date() } },
      );

      if (revoked.modifiedCount !== 1) {
        throw AppError("Refresh session is invalid or already revoked", 401);
      }

      const accessToken = generateAccessToken(payload.userId);
      const newRefreshToken = generateRefreshToken(payload.userId);
      const newRefreshTokenHash = await hashPassword(newRefreshToken);
      const newRefreshPayload = verifyRefreshToken(newRefreshToken) as {
        exp?: number;
      };

      await Session.create({
        userId: payload.userId,
        refreshTokenHash: newRefreshTokenHash,
        expiresAt: new Date((newRefreshPayload.exp ?? 0) * 1000),
      });

      return { accessToken, refreshToken: newRefreshToken };
    }
  }

  throw AppError("Refresh session is invalid or revoked", 401);
}

export const logoutUser = async (refreshToken: string) => {
  let payload: { userId?: string };

  try {
    payload = verifyRefreshToken(refreshToken) as { userId?: string };
  } catch {
    throw AppError("Invalid or expired refresh token", 401);
  }

  if (!payload.userId) {
    throw AppError("Invalid refresh token", 401);
  }

  const activeSessions = await Session.find({
    userId: payload.userId,
    revokedAt: null,
    expiresAt: { $gt: new Date() },
  }).select("+refreshTokenHash");

  for (const session of activeSessions) {
    const isMatchingSession = await comparePassword(
      refreshToken,
      session.refreshTokenHash,
    );

    if (isMatchingSession) {
      session.revokedAt = new Date();
      await session.save();
      return;
    }
  }

  throw AppError("Refresh session is invalid or already revoked", 401);
};

