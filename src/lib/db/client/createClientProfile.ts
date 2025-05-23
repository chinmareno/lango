import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "../../../../prisma/prisma";

interface ICreateClientProfile {
  userId: string;
  name: string;
}

export const createClientProfile = async (data: ICreateClientProfile) => {
  try {
    await prisma.clientProfile.create({ data });
  } catch (error) {
    console.log(error);
  }
};
