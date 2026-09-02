import { z } from "zod";

export const registerUserSchema = z.object({
	name: z.string().trim().min(2, "Name must be at least 2 characters"),
	email: z.string().trim().email("Invalid email address").toLowerCase(),
	password: z.string().min(8, "Password must be at least 8 characters"),
});

export type registerInput = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .toLowerCase(),

  password: z
    .string()
    .min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginUserSchema>;