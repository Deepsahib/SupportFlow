import type { HydratedDocument, Types } from "mongoose";

export enum TicketStatus {
	OPEN = "OPEN",
	IN_PROGRESS = "IN_PROGRESS",
	RESOLVED = "RESOLVED",
	CLOSED = "CLOSED",
}

export enum TicketPriority {
	LOW = "LOW",
	MEDIUM = "MEDIUM",
	HIGH = "HIGH",
	URGENT = "URGENT",
}

export interface ITicket {
	title: string;
	description: string;
	workspaceId: Types.ObjectId;
	createdBy: Types.ObjectId;
	assignedTo?: Types.ObjectId;
	status: TicketStatus;
	priority: TicketPriority;
	createdAt?: Date;
	updatedAt?: Date;
}

export type CreateTicketInput = Pick<
	ITicket,
	"title" | "description" | "workspaceId" | "createdBy" | "assignedTo" | "status" | "priority"
>;

export type TicketDocument = HydratedDocument<ITicket>;