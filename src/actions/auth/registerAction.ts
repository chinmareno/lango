"use server";

import prisma from "@/lib/prisma";
import registerSchema from "@/lib/schemas/registerSchema";
import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

type RegisterData = z.infer<typeof registerSchema>;

export default async function registerAction(data: RegisterData) {
  try {
    registerSchema.parse(data);
    const { name, email, password } = data;
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser)
      return { success: false, message: "Email already exists" };

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) return { success: false, message: "User not found" };
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
  redirect("../../home");
}
