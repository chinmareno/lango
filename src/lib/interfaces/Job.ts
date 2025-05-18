import { LanguagePair } from "../types/LanguagePair";

type JobStatus = "untaken" | "taken" | "done";

export interface Job {
  title: string;
  type: string;
  fee: number;
  description: string;
  languagePair: LanguagePair;
  takenBy: string | null;
  status: JobStatus | string; // TODO: Remove the | string later after dedicated backend is ready
}
