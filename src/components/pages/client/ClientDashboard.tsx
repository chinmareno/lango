"use client";

import { useState } from "react";

const tabs = ["POSTED", "IN_PROGRESS", "COMPLETED"];
type Tab = (typeof tabs)[number];

export const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("POSTED");

  return (
    <div className="p-4 max-w-4xl mx-auto">
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
