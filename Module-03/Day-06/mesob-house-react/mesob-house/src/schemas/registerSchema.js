import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(60, "Name is too long"),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address")
    .max(254, "Email is too long")
    .email("Enter a valid email address"),
  password: z
    .string()
    .min(8, "Use at least 8 characters")
    .max(100, "Password is too long"),
});
