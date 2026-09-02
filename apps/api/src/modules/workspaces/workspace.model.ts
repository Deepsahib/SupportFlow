import mongoose from "mongoose";
import type { IWorkspace } from "./workspace.types.js";
import workspaceSchema from "./workspace.schema.js";

export const Workspace = mongoose.model<IWorkspace>("Workspace", workspaceSchema);
