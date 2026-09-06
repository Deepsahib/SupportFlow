import mongoose from "mongoose";
import type { ITicket } from "./ticket.types.js";
import { TicketPriority, TicketStatus } from "./ticket.types.js";

const ticketSchema = new mongoose.Schema<ITicket>(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			maxlength: 200,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		workspaceId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Workspace",
			required: true,
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		assignedTo: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
            default: null, 
		},
		status: {
			type: String,
			enum: Object.values(TicketStatus),
			default: TicketStatus.OPEN,
		},
		priority: {
			type: String,
			enum: Object.values(TicketPriority),
			default: TicketPriority.MEDIUM,
		},
	},
	{ timestamps: true },
);

export default ticketSchema;