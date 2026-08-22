import express, { Request, Response } from 'express';
import cors from 'cors';

const app=express();

app.use(cors());

app.get("/health",(req:Request,res:Response)=>{
    res.send("Api is runnig")
})

export default app;