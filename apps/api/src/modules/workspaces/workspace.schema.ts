import mongoose from "mongoose";
import type { IWorkspace } from "./workspace.types.js";

const workspaceSchema = new mongoose.Schema<IWorkspace>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			minlength: 2,
			maxlength: 80,
		},
		slug: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			unique: true,
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true },
);

export default workspaceSchema;
