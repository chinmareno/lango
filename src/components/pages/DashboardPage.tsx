"use client";

import getMyJobList from "@/actions/job/getJobListAction";
import { JobListCard } from "../ui/JobListCard";
import { useEffect, useState } from "react";
import { JobDetailPanel } from "../ui/JobDetailPanel";
import { ISelectedJob } from "@/lib/interfaces/ISelectedJob";
import { IJobList } from "../../lib/interfaces/IJobList";
export const DashboardPage = () => {
  useEffect(() => {
    const myJobList = getMyJobList();

    setJobsList(myJobList);
  }, []);

  const [jobsList, setJobsList] = useState<IJobList[] | null>(null);

  const [selectedJob, setSelectedJob] = useState<ISelectedJob>({
    title: "Your Selected Job",
    type: "Your Job Type",
    fee: 0,
    description: "Your Job Description",
    languagePair: { source: "Specific Language", target: "Specific Language" },
  });

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
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-1">Available Jobs</h2>
            {jobsList ? (
              jobsList.map((job, index) => (
                <button
                  key={index}
                  className="w-full hover:bg-gray-100"
                  onClick={() => setSelectedJob(job)}
                >
                  <JobListCard
                    jobTitle={job.title}
                    jobType={job.type}
                    jobFee={job.fee}
                  />
                </button>
              ))
            ) : (
              <p className="text-gray-700 text-sm">
                Browse and apply for new translation tasks.
              </p>
            )}
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-1">Ongoing Projects</h2>
            <p className="text-gray-700 text-sm">
              Continue working on projects you’re assigned to.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-1">Earnings</h2>
            <p className="text-gray-700 text-sm">
              Track your payments and job history.
            </p>
          </div>
        </section>
        <section className="flex flex-row justify-center bg-amber-300 mt-10">
          <JobDetailPanel {...selectedJob} />
        </section>
      </main>
    </div>
  );
};
