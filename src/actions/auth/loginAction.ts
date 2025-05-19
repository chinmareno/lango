"use server";

import { z } from "zod";
import { loginSchema } from "@/lib/schemas/loginSchema";
import { comparePassword } from "@/lib/bcrypt";
import { findUserByEmail } from "@/lib/db/findUserByEmail";

type LoginSchema = z.infer<typeof loginSchema>;

export default async function loginAction(data: LoginSchema) {
  try {
    loginSchema.parse(data);
    const { email, password } = data;
    const user = await findUserByEmail(email);
    if (!user) {
      return { success: false, message: "Invalid email or password" };
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return { success: false, message: "Invalid email or password" };
    }
    return { success: true, email: user.email };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0].message };
    } else {
      return { success: false, message: "Login failed" };
    }
  }
}
