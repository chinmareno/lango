import { UserRole } from "@/lib/types";
import prisma from "../../../../prisma/prisma";

interface ICreateUser {
  email: string;
  password: string;
  role: UserRole;
}

export const createUser = async (data: ICreateUser) => {
  const { email, password, role } = data;
  if (role === "client") {
    const user = await prisma.user.create({
      data: {
        email,
        password,
        currentRole: "CLIENT",
      },
    });
    return user;
  } else if (role === "translator") {
    const user = await prisma.user.create({
      data: {
        email,
        password,
        currentRole: "TRANSLATOR",
      },
    });
    return user;
  }
};
