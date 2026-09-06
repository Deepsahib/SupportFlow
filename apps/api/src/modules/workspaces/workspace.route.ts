import express from 'express';
import { authenticate } from '../../common/middleware/authenticate.js';
import { createWorkspaceController, getUserWorkspaceController, getWorkspaceController } from './workspace.controller.js';
import { workspaceMember } from '../../common/middleware/requireWorkspaceMember.js';
const router=express.Router();

router.post("/workspace",authenticate,createWorkspaceController);
router.post("/getworkspace",authenticate,getUserWorkspaceController);
router.get("/getworkspace/:workspaceId",authenticate,workspaceMember,getWorkspaceController);

export {router as workspaceRouter};