import prisma from "../../../../prisma/prisma";

export const getJobsByClientId = async (clientId: string) => {
  try {
    const jobs = await prisma.job.findMany({
      where: {
        clientId,
      },
      include: { applications: true },
    });
    return jobs;
  } catch (error) {
    console.log(error);
  }
};
