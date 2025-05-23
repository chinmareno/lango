import { ApplicationStatus, JobStatus, PaymentType } from "../types";

export interface IJob {
  id?: string;
  clientId: string;
  title: string;
  description: string;
  sourceLanguage: string;
  targetLanguage: string;
  fee: number;
  paymentType: PaymentType;
  status?: JobStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IJobWithApplications extends IJob {
  applications: ApplicationStatus[];
}
