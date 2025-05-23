import { JobListCard } from "@/components/ui";
import { IApplicationWithJob } from "@/lib/interfaces/IApplication";
import { Dispatch, SetStateAction, useMemo } from "react";

interface IAppliedJobs {
  applications: IApplicationWithJob[] | null;
  setSelectedApplication: Dispatch<SetStateAction<IApplicationWithJob | null>>;
}

export const AppliedJobs = ({
  applications,
  setSelectedApplication,
}: IAppliedJobs) => {
  if (applications == null) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-1">No Applications</h2>
        <p className="text-gray-700 text-sm">
          Browse and apply for new translation jobs.
        </p>
      </div>
    );
  }

  const pendingAndRejectedApplications = useMemo(
    () =>
      applications
        .filter(({ status }) => status === "PENDING" || status === "REJECTED")
        .sort((a) => {
          if (a.status === "PENDING") return -1;
          else if (a.status === "REJECTED") return 1;
          else return 0;
        }),
    [applications]
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-1">Applied Jobs</h2>
      {pendingAndRejectedApplications.map((application, index) => (
        <button
          key={index}
          className="w-full hover:bg-gray-100"
          onClick={() =>
            setSelectedApplication({
              ...application,
            })
          }
        >
          <JobListCard
            jobTitle={application.job.title}
            jobType={application.job.paymentType}
            jobFee={application.job.fee}
          />
        </button>
      ))}
    </div>
  );
};
