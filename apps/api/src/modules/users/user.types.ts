import type { HydratedDocument } from "mongoose";
import type { IMembership } from "../memberships/membership.types.js";

export interface IUser {
  name: string;
  email: string;
  passwordHash: string;
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CreateUserInput = Pick<
  IUser,
  "name" | "email" | "passwordHash"
>;

export type UserDocument = HydratedDocument<IUser>;

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
      };
      membership?: IMembership;
    }
  }
}

export {};