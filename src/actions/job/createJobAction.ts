"use server";

import { createJob } from "@/lib/db/job";
import { IJob } from "@/lib/interfaces/IJob";

export async function createJobAction(jobData: IJob) {
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
    return { success: true, message: "Job created successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to create job" };
  }
}
