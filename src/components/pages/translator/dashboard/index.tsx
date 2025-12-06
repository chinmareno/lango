"use client";

import { useEffect, useState } from "react";
import { AppliedJobs } from "./AppliedJobs";
import { AcceptedJobs } from "./AcceptedJobs";
import { getApplicationsAction } from "@/actions/application";
import { useSession } from "next-auth/react";
import { IApplicationWithJob } from "@/lib/interfaces/IApplication";
import { JobDetailPanel } from "@/components/ui";

export const TranslatorDashboardPage = () => {
  const [selectedApplication, setSelectedApplication] =
    useState<IApplicationWithJob | null>(null);
  const [applications, setApplication] = useState<IApplicationWithJob[] | null>(
    null
  );
  const { data: session } = useSession();
  useEffect(() => {
    const fetchJobs = async () => {
      if (!session?.user?.translatorId) return;
      const applicationsWithJob = await getApplicationsAction(
        session?.user?.translatorId
      );
      if (applicationsWithJob) setApplication(applicationsWithJob);
    };
    fetchJobs();
  }, [applications]);

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
          <AppliedJobs
            applications={applications}
            setSelectedApplication={setSelectedApplication}
          />
          <AcceptedJobs
            applications={applications}
            setSelectedApplication={setSelectedApplication}
          />
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-1">Earnings</h2>
            <p className="text-gray-700 text-sm">
              Track your payments and job history.
            </p>
          </div>
        </section>
        <section className="flex flex-row justify-center mt-10">
          <JobDetailPanel selectedApplication={selectedApplication} />
        </section>
      </main>
    </div>
  );
};
