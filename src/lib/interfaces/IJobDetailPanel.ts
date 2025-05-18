import { LanguagePair } from "../types/LanguagePair";

export interface IJobDetailPanel {
  title: string;
  type: string;
  fee: number;
  description: string;
  languagePair: LanguagePair;
}
