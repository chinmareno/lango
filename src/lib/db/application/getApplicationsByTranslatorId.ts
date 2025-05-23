import prisma from "../../../../prisma/prisma";

export const getApplicationsByTranslatorId = async (translatorId: string) => {
  try {
    const applications = await prisma.application.findMany({
      where: {
        translatorId,
      },
      include: { job: true },
    });
    return applications;
  } catch (error) {
    console.log(error);
  }
};
