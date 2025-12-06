import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(50, "Name must be less than 50 characters"),

    email: z
      .string()
      .min(1, "Email is required")
      .max(100, "Email must be less than 100 characters")
      .email("Invalid email address"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(32, "Password must be less than 32 characters"),

    confirmPassword: z
      .string()
      .min(1, "Confirm Password is required")
      .max(32, "Password must be less than 32 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
