import { Role } from "@/components/pages/auth/RegisterPage/RegisterRoleSelector";
import prisma from "../../../prisma/prisma";

interface ICreateUser {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export const createUser = async (data: ICreateUser) => {
  const { email, name, password, role } = data;
  if (role === "client") {
    await prisma.user.create({
      data: {
        email,
        password,
        currentRole: "CLIENT",
        client: {
          create: {
            name,
          },
        },
      },
    });
  }
  if (role === "translator") {
    await prisma.user.create({
      data: {
        email,
        password,
        currentRole: "TRANSLATOR",
        translator: {
          create: {
            name,
          },
        },
      },
    });
  }
};
