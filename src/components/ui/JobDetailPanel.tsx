import { Job } from "@/lib/interfaces/Job";
import { SelectedJobProps } from "../pages/translator/dashboard/DashboardPage";

export const JobDetailPanel = ({
  title,
  type,
  fee,
  description,
  languagePair,
  status,
  selectedJobType,
}: SelectedJobProps) => {
  return (
    <div
      className={`relative bg-white rounded-xl shadow-md p-6 mt-8 ${
        type === "hourly" ? "border-blue-300" : "border-green-300"
      } border-4`}
    >
      {status === "taken" && (
        <div className="absolute top-2 right-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded-md font-bold">
          Taken
        </div>
      )}

      <h2 className="text-xl font-semibold mb-2 text-gray-900">{title}</h2>

      <div className="text-sm text-gray-600 mb-1">
        Type: <span className="font-medium capitalize">{type}</span>
      </div>
      <div className="text-sm text-gray-600 mb-1">
        Fee:
        <span className="font-medium">
          {fee}
          {type === "hourly" ? "$/hour" : "$/project"}
        </span>
      </div>
      <div className="text-sm text-gray-600 mb-4">
        Language:{" "}
        <span className="font-medium">
          {languagePair.source} ➜ {languagePair.target}
        </span>
      </div>

      <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-line mb-6">
        {description}
      </p>

      {selectedJobType === "available jobs" ? (
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
      ) : selectedJobType === "onprogress jobs" ? (
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
      ) : (
        selectedJobType === "done jobs" && (
          <button className="px-3 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 flex-shrink-0">
            Chat Client
          </button>
        )
      )}
    </div>
  );
};
