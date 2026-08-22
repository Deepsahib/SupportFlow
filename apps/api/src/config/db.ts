import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

export const connectDatabase=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log("mongodb has been connected")
    } catch (error) {
        console.log("error has been occured while connecting to the mongodb")
    }
}