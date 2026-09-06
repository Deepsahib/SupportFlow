import { NextFunction, Request, Response } from "express";
import { AppError } from "../../common/errors/AppError.js";
import { CreateTicket } from "./ticket.service.js";

export const TicketController = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const workspaceId = req.params.workspaceId;
        const userId = req.user?.userId;
        const { title, description, priority } = req.body;

        if (!userId) {
            throw AppError("User not authenticated", 401);
        }

        const ticket = await CreateTicket(
            workspaceId,
            userId,
            title,
            description,
            priority,
        );

        return res.status(201).json({
            success: true,
            data: ticket,
        });
    } catch (error) {
        return next(error);
    }
}