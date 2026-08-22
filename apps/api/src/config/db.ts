import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

export const connectDatabase=async()=>{
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log("mongodb has been connected")
}