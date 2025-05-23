import prisma from "../../../../prisma/prisma";

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { clientProfile: true, translatorProfile: true },
  });
  return user;
};
