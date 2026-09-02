import mongoose from "mongoose";
import type { ISession } from "./session.type.js";

const sessionSchema = new mongoose.Schema<ISession>(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
			
		},
		refreshTokenHash: {
			type: String,
			required: true,
			select: false,
		},
		expiresAt: {
			type: Date,
			required: true,
			index: true,
		},
		revokedAt: {
			type: Date,
			default: null,
		},
	},
	{ timestamps: true },
);

export const Session = mongoose.model<ISession>("Session", sessionSchema);
