import express from 'express';
import { authenticate } from '../../common/middleware/authenticate.js';
import { createWorkspaceController } from './workspace.controller.js';
const router=express.Router();

router.post("/workspace",authenticate,createWorkspaceController);

export {router as workspaceRouter};