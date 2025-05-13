import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(1, "Confirm Password is required")
      .max(32, "Password must be less than 32 characters"),
  })
  .refine(
    (data) => {
      return data.password.length < 6 || data.password === data.confirmPassword;
    },
    { message: "Passwords do not match", path: ["confirmPassword"] }
  );
