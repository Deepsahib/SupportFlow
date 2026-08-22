import express, { Request, Response } from 'express';
import cors from 'cors';
import { notFound } from './common/middleware/notFound.js';
import { errorHandler } from './common/middleware/errorHandler.js';
import dotenv from 'dotenv';
dotenv.config();

const app=express();

app.use(cors());
app.use(express.json());

app.get("/health",(req:Request,res:Response)=>{
    return res.json({
        success:true,
        messgae:"server is running smoothly and correctly"
    })
})


app.use(notFound);
app.use(errorHandler);

export default app;