"use server";

import { z } from "zod";
import { hashPassword } from "@/lib/bcrypt";
import { createUser, findUserByEmail } from "@/lib/db/user";
import { registerSchema } from "@/lib/schemas/auth";
import { createTranslatorProfile } from "@/lib/db/translator";
import { createClientProfile } from "@/lib/db/client";

type RegisterData = z.infer<typeof registerSchema>;
interface IRegisterAction extends RegisterData {
  role: "translator" | "client";
}

export async function registerAction(data: IRegisterAction) {
  try {
    registerSchema.parse(data);
    const { name, email, password, role } = data;
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return { success: false, message: "Email already exists" };
    }

    const hashedPassword = await hashPassword(password);
    const user = await createUser({ email, password: hashedPassword, role });

    if (user && role === "translator") {
      await createTranslatorProfile({ userId: user.id, name });
    } else if (user && role === "client") {
      await createClientProfile({ userId: user.id, name });
    }
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
