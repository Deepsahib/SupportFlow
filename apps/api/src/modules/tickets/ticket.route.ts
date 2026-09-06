import express from 'express';
import { getTicketWorkspaceController, TicketController } from './ticket.controller.js';
import { authenticate } from '../../common/middleware/authenticate.js';
import { workspaceMember } from '../../common/middleware/requireWorkspaceMember.js';
const router=express.Router();

router.post("/tickets/:workspaceId",authenticate,workspaceMember,TicketController);
router.get("/tickets/:workspaceId",authenticate,workspaceMember,getTicketWorkspaceController);

export {router as ticketRouter}