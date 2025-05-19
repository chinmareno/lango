"use client";

import getMyJobList from "@/actions/job/getJobListAction";
import { useEffect, useState } from "react";
import { JobDetailPanel } from "../../../ui/JobDetailPanel";
import { AvailableJobs } from "./AvailableJobs";
import { Job } from "@/lib/interfaces/Job";
import { EmptyJobDetail } from "@/components/ui/EmptyJobDetail";
import { OnProgressJobs } from "./OnProgressJobs";

export interface SelectedJobProps extends Job {
  selectedJobType: string; // TODO: after db is ready change to union type
}
export const DashboardPage = () => {
  useEffect(() => {
    const myJobList = getMyJobList();

    setJobsList(myJobList);
  }, []);
  const [jobsList, setJobsList] = useState<Job[] | null>(null);

  const [selectedJob, setSelectedJob] = useState<SelectedJobProps | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-600">
          Overview of your translation work and progress.
        </p>
      </header>

      <main>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AvailableJobs jobsList={jobsList} setSelectedJob={setSelectedJob} />
          <OnProgressJobs jobsList={jobsList} setSelectedJob={setSelectedJob} />
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-1">Earnings</h2>
            <p className="text-gray-700 text-sm">
              Track your payments and job history.
            </p>
          </div>
        </section>
        <section className="flex flex-row justify-center bg-amber-300 mt-10">
          {selectedJob ? (
            <JobDetailPanel {...selectedJob} />
          ) : (
            <EmptyJobDetail />
          )}
        </section>
      </main>
    </div>
  );
};
