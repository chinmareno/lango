import { getJobsByClientId } from "@/lib/db/job";

export const getJobsAction = async (clientId: string) => {
  try {
    const jobs = await getJobsByClientId(clientId);
    return jobs;
  } catch (error) {
    console.log(error);
  }
};
