import mongoose from "mongoose";
import type { ITicket } from "./ticket.types.js";
import ticketSchema from "./ticket.schema.js";

export const Ticket = mongoose.model<ITicket>("Ticket", ticketSchema);