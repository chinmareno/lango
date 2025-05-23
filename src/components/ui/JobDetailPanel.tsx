import { IApplicationWithJob } from "@/lib/interfaces/IApplication";

interface JobDetailPanelProps {
  selectedApplication: IApplicationWithJob | null;
}

export const JobDetailPanel = ({
  selectedApplication,
}: JobDetailPanelProps) => {
  if (selectedApplication === null) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          No Job Selected
        </h2>
        <p className="text-gray-600 text-sm">
          Click on a job from the list to view its details here.
        </p>
      </div>
    );
  }
  const { job } = selectedApplication;
  return (
    <div
      className={`relative bg-white rounded-xl shadow-md p-6 mt-8 ${
        job.paymentType === "FIXED" ? "border-blue-300" : "border-green-300"
      } border-4`}
    >
      <div className="absolute top-2 right-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded-md font-bold">
        {selectedApplication.status === "REJECTED" && "Rejected"}
        {selectedApplication.status === "PENDING" && "PENDING"}
        {selectedApplication.status === "ACCEPTED" && "ACCEPTED"}
      </div>
      <h2 className="text-xl font-semibold mb-2 text-gray-900">{job.title}</h2>
      <div className="text-sm text-gray-600 mb-1">
        Type:
        <span className="font-medium capitalize">{job.paymentType}</span>
      </div>
      <div className="text-sm text-gray-600 mb-1">
        Fee:
        <span className="font-medium">
          {job.fee}
          {job.paymentType === "HOURLY" ? "$/hour" : "$/project"}
        </span>
      </div>
      <div className="text-sm text-gray-600 mb-4">
        Language:
        <span className="font-medium">
          {job.sourceLanguage} ➜ {job.targetLanguage}
        </span>
      </div>
      <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-line mb-6">
        {job.description}
      </p>
      {selectedApplication.status === "PENDING" && job.status === "OPEN" && (
        <div className="flex gap-3">
          <button className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex-shrink-0">
            Delete Job
          </button>
        </div>
      )}
      {selectedApplication.status === "ACCEPTED" && job.status === "OPEN" && (
        <div className="flex gap-3">
          <button className="px-3 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 flex-shrink-0">
            Chat Client
          </button>
          <button className="flex-grow px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold">
            Start Job
          </button>
          <button className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex-shrink-0">
            Delete Job
          </button>
        </div>
      )}
      {selectedApplication.status === "ACCEPTED" &&
        job.status === "IN_PROGRESS" && (
          <div className="flex gap-3">
            <button className="px-3 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 flex-shrink-0">
              Chat Client
            </button>
            <button className="flex-grow px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold">
              Finish Job
            </button>
            <button className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex-shrink-0">
              Cancel Job
            </button>
          </div>
        )}
      {selectedApplication.status === "ACCEPTED" &&
        job.status === "COMPLETED" && (
          <div className="flex gap-3">
            <button className="px-3 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 flex-shrink-0">
              Chat Client
            </button>
            <button className="flex-grow px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold">
              Rate Job
            </button>
          </div>
        )}
    </div>
  );
};
