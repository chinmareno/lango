"use server";

import prisma from "@/lib/prisma";
import registerSchema from "@/lib/schemas/registerSchema";
import { z } from "zod";

type RegisterData = z.infer<typeof registerSchema>;

export default async function registerAction(data: RegisterData) {
  try {
    registerSchema.parse(data);
    const { name, email, password } = data;
    await prisma.user.create({ data: { name, email, password } });
  } catch (error) {
    console.error("Registration error:", error);
    throw new Error("Failed to register user.");
  }
}
