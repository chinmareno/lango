"use server";
import { getApplicationsByTranslatorId } from "@/lib/db/application";

export const getApplicationsAction = async (translatorId: string) => {
  try {
    const applications = getApplicationsByTranslatorId(translatorId);
    return applications;
  } catch (error) {
    console.log(error);
  }
};
