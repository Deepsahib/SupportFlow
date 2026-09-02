import type { HydratedDocument, Types } from "mongoose";

export enum MembershipRole {
	OWNER = "OWNER",
	ADMIN = "ADMIN",
	AGENT = "AGENT",
	CUSTOMER = "CUSTOMER",
}

export enum MembershipStatus {
	ACTIVE = "ACTIVE",
	SUSPENDED = "SUSPENDED",
}

export interface IMembership {
	userId: Types.ObjectId;
	workspaceId: Types.ObjectId;
	role: MembershipRole;
	status: MembershipStatus;
	joinedAt: Date;
	createdAt?: Date;
	updatedAt?: Date;
}

export type CreateMembershipInput = Pick<
	IMembership,
	"userId" | "workspaceId" | "role" | "status"
>;

export type MembershipDocument = HydratedDocument<IMembership>;
