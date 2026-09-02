import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { notFound } from './common/middleware/notFound.js';
import { errorHandler } from './common/middleware/errorHandler.js';
import { authRoutes } from './modules/auth/auth.route.js';
import { workspaceRouter } from './modules/workspaces/workspace.route.js';
import { loadEnv } from './config/env.js';

loadEnv();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/health", (req: Request, res: Response) => {
    return res.json({
        success: true,
        messgae: "server is running smoothly and correctly"
    })
})

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1", workspaceRouter)


app.use(notFound);
app.use(errorHandler);

export default app;
