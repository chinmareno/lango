import { JobListCard } from "@/components/ui/JobListCard";
import { Dispatch, SetStateAction, useMemo } from "react";
import { IApplicationWithJob } from "@/lib/interfaces/IApplication";

interface IAcceptedJobs {
  applications: IApplicationWithJob[] | null;
  setSelectedApplication: Dispatch<SetStateAction<IApplicationWithJob | null>>;
}

export const AcceptedJobs = ({
  applications,
  setSelectedApplication,
}: IAcceptedJobs) => {
  if (applications === null) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-1">No Accepted Projects</h2>
        <p className="text-gray-700 text-sm">
          Continue working on projects you’re assigned to.
        </p>
      </div>
    );
  }
  const acceptedApplications = useMemo(
    () =>
      applications
        .filter((application) => application.status === "ACCEPTED")
        .sort((a) => {
          if (a.job.status === "IN_PROGRESS") return -1;
          else if (a.job.status === "OPEN") return 1;
          return 0;
        }),
    [applications]
  );
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-1">Accepted Projects</h2>
      {acceptedApplications.map((application, index) => (
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
