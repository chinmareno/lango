import { JobListCard } from "@/components/ui/JobListCard";
import { Job } from "@/lib/interfaces/Job";
import { Dispatch, SetStateAction, useMemo } from "react";
import { SelectedJobProps } from ".";

interface IAvailableJobs {
  jobsList: Job[] | null;
  setSelectedJob: Dispatch<SetStateAction<SelectedJobProps | null>>;
}

export const AvailableJobs = ({ jobsList, setSelectedJob }: IAvailableJobs) => {
  if (jobsList == null) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <p className="text-gray-700 text-sm">
          Browse and apply for new translation jobs.
        </p>
      </div>
    );
  }
  const userId = "reno";
  const availableJobsList = useMemo(
    () =>
      jobsList?.filter(
        (job) => !(job.takenBy === userId && job.status === "taken")
      ),
    [jobsList]
  );
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-1">Available Jobs</h2>
      {availableJobsList.map((job, index) => (
        <button
          key={index}
          className="w-full hover:bg-gray-100"
          onClick={() =>
            setSelectedJob({ ...job, selectedJobType: "available jobs" })
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
