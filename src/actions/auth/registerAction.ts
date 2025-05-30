"use server";

import { z } from "zod";
import { hashPassword } from "@/lib/bcrypt";
import { registerSchema } from "@/lib/schemas/registerSchema";
import { createUser, findUserByEmail } from "@/lib/db";

type RegisterData = z.infer<typeof registerSchema>;

export default async function registerAction(data: RegisterData) {
  try {
    registerSchema.parse(data);
    const { name, email, password, role } = data;
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return { success: false, message: "Email already exists" };
    }

    const hashedPassword = await hashPassword(password);
    await createUser({ name, email, password: hashedPassword, role });
    return { success: true, email };
  } catch (error: any) {
    console.log("Error happen because of: ", error.message);
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0].message };
    } else if (error.message === "Error creating token") {
      return {
        success: false,
        message: "Failed to create authentication token",
      };
    } else {
      return { success: false, message: "Registration failed" };
    }
  }
}
