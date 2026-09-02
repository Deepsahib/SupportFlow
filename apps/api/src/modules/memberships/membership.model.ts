import mongoose from "mongoose";
import type { IMembership } from "./membership.types.js";
import { MembershipRole, MembershipStatus } from "./membership.types.js";

const membershipSchema = new mongoose.Schema<IMembership>(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		workspaceId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Workspace",
			required: true,
		},
		role: {
			type: String,
			enum: Object.values(MembershipRole),
			required: true,
		},
		status: {
			type: String,
			enum: Object.values(MembershipStatus),
			default: MembershipStatus.ACTIVE,
		},
		joinedAt: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true },
);

export const Membership = mongoose.model<IMembership>("Membership", membershipSchema);
