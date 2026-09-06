import { AppError } from "../../common/errors/AppError.js";
import mongoose from "mongoose";
import { Ticket } from "./ticket.model.js";
import { TicketPriority } from "./ticket.types.js";

export const CreateTicket = async (
    workspaceId: string | string[],
    userId: string,
    title: string,
    description: string,
    priority: TicketPriority,
) => {
    const workspaceIdValue = Array.isArray(workspaceId) ? workspaceId[0] : workspaceId;

    if (
        !workspaceIdValue ||
        !userId ||
        !title ||
        !description ||
        !priority ||
        !mongoose.Types.ObjectId.isValid(workspaceIdValue) ||
        !mongoose.Types.ObjectId.isValid(userId)
    ) {
        throw AppError("Missing required fields",400);
    }

    const ticket = await Ticket.create({
        title,
        description,
        workspaceId: new mongoose.Types.ObjectId(workspaceIdValue),
        createdBy: new mongoose.Types.ObjectId(userId),
        priority
    });

    return ticket;
}

export const GetTicketWorkspaceService = async (
    workspaceId: string | string[],
    userId: string,
) => {
    const workspaceIdValue = Array.isArray(workspaceId) ? workspaceId[0] : workspaceId;
    if (
        !workspaceIdValue ||
        !userId ||
        !mongoose.Types.ObjectId.isValid(workspaceIdValue) ||
        !mongoose.Types.ObjectId.isValid(userId)
    ) {
        throw AppError("Missing required fields",400);
    }

    const ticket = await Ticket.find({
        workspaceId: new mongoose.Types.ObjectId(workspaceIdValue)
    });

    return ticket;
}