"use client";

import { SquarePlus } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { IJob } from "@/lib/interfaces";
import { useForm } from "react-hook-form";
import { createJobAction } from "@/actions/job";

const tabs = ["POSTED", "IN_PROGRESS", "COMPLETED"];
type Tab = (typeof tabs)[number];

export const ClientDashboardPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("POSTED");
  const [isAddingJob, setIsAddingJob] = useState(false);
  const { data: session } = useSession();

  const { register, handleSubmit, reset } = useForm<IJob>();

  const handleCreateJob = async (data: IJob) => {
    const jobData = { ...data, clientId: session?.user.clientId! };
    try {
      const res = await createJobAction(jobData);
      if (res.success) {
        reset();
        toast(res.message);
      } else {
        toast(res.message, { style: { color: "red" } });
      }
    } catch (error) {}
  };

  const handleShowCreateJobForm = () => {
    if (session?.user.clientId) {
    }
    setIsAddingJob(true);
  };
  return (
    <div className="p-4 max-w-4xl mx-auto">
      {isAddingJob && (
        <form
          onSubmit={handleSubmit(handleCreateJob)}
          className="space-y-4 max-w-md mx-auto"
        >
          <input
            type="text"
            {...register("title")}
            placeholder="Job title"
            className="w-full p-2 border rounded"
          />
          <textarea
            {...register("description")}
            placeholder="Description"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            {...register("sourceLanguage")}
            placeholder="Source Language"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            {...register("targetLanguage")}
            placeholder="Target Language"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            {...register("fee")}
            placeholder="Fee"
            className="w-full p-2 border rounded"
          />

          <select
            {...register("paymentType")}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Payment Type</option>
            <option value="FIXED">Fixed</option>
            <option value="HOURLY">Hourly</option>
          </select>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded ml-auto block"
          >
            Create Job
          </button>
        </form>
      )}

      <h1 className="text-2xl font-bold mb-4">Client Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full font-medium transition ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab === "POSTED" && "Posted"}
            {tab === "IN_PROGRESS" && "In Progress"}
            {tab === "COMPLETED" && "Completed"}
          </button>
        ))}
        <button
          onClick={() => handleShowCreateJobForm()}
          className="ml-auto mr-2.5 hover:cursor-pointer"
        >
          <SquarePlus />
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white p-4 rounded-xl shadow">
        {activeTab === "POSTED" && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Posted Jobs</h2>
            <p className="text-gray-500">List of jobs you've posted.</p>
          </div>
        )}
        {activeTab === "IN_PROGRESS" && (
          <div>
            <h2 className="text-xl font-semibold mb-2">InProgress Jobs</h2>
            <p className="text-gray-500">Jobs currently being worked on.</p>
          </div>
        )}
        {activeTab === "COMPLETED" && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Completed Jobs</h2>
            <p className="text-gray-500">Work that has been finished.</p>
          </div>
        )}
      </div>
    </div>
  );
};
