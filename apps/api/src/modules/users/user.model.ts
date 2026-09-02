import mongoose from "mongoose";
import type { IUser } from "./user.types.js";

const userSchema = new mongoose.Schema<IUser>(
	{
		name:{
            type:String,
            required:true,
            trim:true
        },
		email: {
			type: String,
			unique: true,
            trim:true,
            required:true
		},
		passwordHash:{
            type:String,
            required:true,
            select:false
        },
		isVerified:{
          type:Boolean,
          default:false
        }
	},
	{ timestamps: true },
);

export const User = mongoose.model<IUser>("User", userSchema);
