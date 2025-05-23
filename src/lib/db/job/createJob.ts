import { IJob } from "@/lib/interfaces/IJob";
import prisma from "../../../../prisma/prisma";

export const createJob = async (data: IJob) => {
  try {
    await prisma.job.create({
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
