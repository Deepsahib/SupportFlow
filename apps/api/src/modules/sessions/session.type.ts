import type { Types } from "mongoose";

export interface ISession {
	userId: Types.ObjectId;
	refreshTokenHash: string;
	expiresAt: Date;
	revokedAt?: Date | null;
	createdAt: Date;
	updatedAt: Date;
}