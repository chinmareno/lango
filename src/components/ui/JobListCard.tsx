interface JobListCardProps {
  jobTitle: string;
  jobType: string;
  jobFee: number;
}
export const JobListCard = ({
  jobTitle,
  jobType,
  jobFee,
}: JobListCardProps) => {
  return (
    <div className="flex border-gray-200 border-t-2 p-2.5 flex-row justify-between">
      <span className="text-gray-700 text-sm ">{jobTitle}</span>
      <span className="right-1 text-gray-700 text-sm">
        {jobType === "hourly" ? jobFee + "$/hour" : jobFee + "$/project"}
      </span>
    </div>
  );
};
