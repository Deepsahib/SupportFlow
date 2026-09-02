import express from 'express';
import {
	getMeController,
	loginUserController,
	logoutController,
	refreshTokenController,
	registerUserController,
} from './auth.controller.js';
import { authenticate } from '../../common/middleware/authenticate.js';
const router=express.Router();

router.post("/register",registerUserController)
router.post("/login",loginUserController)
router.post("/refresh",refreshTokenController)
router.post("/logout",logoutController)
router.get("/me",authenticate,getMeController)

export {router as authRoutes};