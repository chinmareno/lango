import { ApplicationStatus } from "../types";
import { IJob } from "./IJob";

export interface IApplication {
  id?: string;
  translatorId: string;
  jobId: string;
  portfolioUrl?: string | null;
  coverLetter?: string | null;
  status?: ApplicationStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IApplicationWithJob extends IApplication {
  job: IJob;
}
