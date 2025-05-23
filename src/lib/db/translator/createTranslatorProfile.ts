import prisma from "../../../../prisma/prisma";

interface ICreateTranslatorProfile {
  userId: string;
  name: string;
}

export const createTranslatorProfile = async (
  data: ICreateTranslatorProfile
) => {
  try {
    await prisma.translatorProfile.create({ data });
  } catch (error) {
    console.log(error);
  }
};
