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
      <span className="text-left text-balance text-sm mr-12">{jobTitle}</span>
      <span className="font-semibold text-sm">
        {jobType === "hourly" ? jobFee + "$/hour" : jobFee + "$/project"}
      </span>
    </div>
  );
};
