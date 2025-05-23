"use server";

import { createJob } from "@/lib/db/job";
import { IJob } from "@/lib/interfaces/IJob";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

export const createJobAction = async (jobData: IJob) => {
  try {
    const {
      clientId,
      title,
      description,
      fee,
      paymentType,
      sourceLanguage,
      targetLanguage,
    } = jobData;
    await createJob({
      clientId,
      title,
      description,
      fee,
      paymentType,
      sourceLanguage,
      targetLanguage,
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2003") {
        console.error("Invalid clientId");
      }
    } else if (error instanceof PrismaClientValidationError) {
      console.error("Missing or invalid fields");
    } else {
      console.error("Unexpected error", error);
    }
  }
};
