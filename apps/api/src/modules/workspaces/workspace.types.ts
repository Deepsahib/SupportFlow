import type { HydratedDocument, Types } from "mongoose";

export interface IWorkspace {
	name: string;
	slug: string;
	createdBy: Types.ObjectId;
	createdAt?: Date;
	updatedAt?: Date;
}

export type CreateWorkspaceInput = Pick<IWorkspace, "name" | "slug" | "createdBy">;

export type WorkspaceDocument = HydratedDocument<IWorkspace>;
