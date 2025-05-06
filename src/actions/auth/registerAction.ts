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
  } catch (error: any) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0].message };
    } else {
      return { success: false, message: "Registration failed" };
    }
  }
  redirect("../../home");
}
