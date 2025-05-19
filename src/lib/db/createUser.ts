import prisma from "./prisma";

interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export const createUser = async (data: ICreateUser) => {
  const user = await prisma.user.create({
    data,
  });
  return user;
};
