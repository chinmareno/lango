import { JobListCard } from "@/components/ui/JobListCard";
import { Job } from "@/lib/interfaces/Job";
import { Dispatch, SetStateAction, useMemo } from "react";
import { SelectedJobProps } from ".";

interface IAcceptedJobs {
  jobsList: Job[] | null;
  setSelectedJob: Dispatch<SetStateAction<SelectedJobProps | null>>;
}

export const AcceptedJobs = ({ jobsList, setSelectedJob }: IAcceptedJobs) => {
  if (jobsList === null) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <p className="text-gray-700 text-sm">
          Continue working on projects you’re assigned to.
        </p>
      </div>
    );
  }
  const userId = "reno";
  const acceptedJobsList = useMemo(
    () =>
      jobsList.filter(
        (job) => job.takenBy === userId && job.status === "taken"
      ),
    [jobsList]
  );
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-1">Accepted Projects</h2>
      {acceptedJobsList.map((job, index) => (
        <button
          key={index}
          className="w-full hover:bg-gray-100"
          onClick={() =>
            setSelectedJob({ ...job, selectedJobType: "onprogress jobs" })
          }
        >
          <JobListCard
            jobTitle={job.title}
            jobType={job.type}
            jobFee={job.fee}
          />
        </button>
      ))}
    </div>
  );
};
