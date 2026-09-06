import mongoose from "mongoose";
import { Workspace } from "./workspace.model.js";
import { Membership } from "../memberships/membership.model.js";
import { MembershipRole, MembershipStatus } from "../memberships/membership.types.js";

export const createWorkspace = async (
	userId: string,
	name: string,
	slug: string,
) => {
	const session = await mongoose.startSession();

	try {
		let createdWorkspace;

		await session.withTransaction(async () => {
			const [workspace] = await Workspace.create(
				[
					{
						name,
						slug,
						createdBy: userId,
					},
				],
				{ session },
			);

			await Membership.create(
				[
					{
						userId,
						workspaceId: workspace._id,
						role: MembershipRole.OWNER,
						status: MembershipStatus.ACTIVE,
					},
				],
				{ session },
			);

			createdWorkspace = workspace;
		});

		return createdWorkspace;
	} catch (error) {
		if (
			error instanceof Error &&
			error.message.includes("retryable writes")
		) {
			const workspace = await Workspace.create({
				name,
				slug,
				createdBy: userId,
			});

			await Membership.create({
				userId,
				workspaceId: workspace._id,
				role: MembershipRole.OWNER,
				status: MembershipStatus.ACTIVE,
			});

			return workspace;
		}

		throw error;
	} finally {
		await session.endSession();
	}
};

export const getUserWorkspace = async (userId: string) => {
	return Membership.find({
		userId: new mongoose.Types.ObjectId(userId),
		status: MembershipStatus.ACTIVE,
	}).populate("workspaceId");
};

export const getWorkspace = async (workspaceId: string|string[]) => {
	return Workspace.findById(workspaceId);
};