// animal-ngo-frontend/src/pages/VolunteerDashboard.jsx
import React, { useState, useEffect } from "react";
import { getMyCases, updateCaseStatus } from "../api/rescueService";
import { useAuth } from "../context/AuthContext";

const VolunteerDashboard = () => {
  const [myCases, setMyCases] = useState([]);
  const [filter, setFilter] = useState("active"); // 'active' or 'resolved'
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchMyAssignments();
  }, []);

  const fetchMyAssignments = async () => {
    try {
      const allCases = await getMyCases();
      // Client-side filter: Keep only cases assigned to ME
      const assignedToMe = allCases.filter(
        (c) => c.assigned_volunteer_id === user.id
      );
      setMyCases(assignedToMe);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching assignments:", err);
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (caseId, newStatus) => {
    if (!window.confirm(`Mark this case as ${newStatus}?`)) return;

    try {
      await updateCaseStatus(caseId, newStatus);
      // Update local state immediately for snappy UI
      setMyCases((prev) =>
        prev.map((c) => (c.id === caseId ? { ...c, status: newStatus } : c))
      );
    } catch (err) {
      alert("Failed to update status.");
    }
  };

  // Filter logic
  const displayedCases = myCases.filter((c) => {
    if (filter === "active") return c.status !== "resolved";
    if (filter === "resolved") return c.status === "resolved";
    return true;
  });

  if (loading)
    return (
      <div className="p-12 text-center text-gray-500 text-xl">
        Loading your assignments...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          My Assignments 📋
        </h1>

        {/* Filter Toggles */}
        <div className="flex bg-gray-200 p-1 rounded-lg">
          <button
            onClick={() => setFilter("active")}
            className={`px-4 py-2 rounded-md font-medium transition ${
              filter === "active"
                ? "bg-white text-blue-600 shadow"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Active Cases
          </button>
          <button
            onClick={() => setFilter("resolved")}
            className={`px-4 py-2 rounded-md font-medium transition ${
              filter === "resolved"
                ? "bg-white text-green-600 shadow"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Past History
          </button>
        </div>
      </div>

      {displayedCases.length === 0 ? (
        <div className="text-center p-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <p className="text-xl text-gray-500">
            No {filter} cases found.
            {filter === "active" && " Great job clearing your queue!"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedCases.map((rescue) => (
            <div
              key={rescue.id}
              className="bg-white p-6 rounded-xl shadow border border-gray-100 flex flex-col md:flex-row justify-between items-center transition hover:shadow-md"
            >
              <div className="mb-4 md:mb-0 flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-800">
                    {rescue.title}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs font-bold uppercase rounded ${
                      rescue.status === "resolved"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {rescue.status}
                  </span>
                  <span className="text-xs text-gray-400">
                    reported on{" "}
                    {new Date(rescue.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{rescue.description}</p>
                {/* Future: Add a "Show Map" button here */}
              </div>

              {/* Action Buttons */}
              {rescue.status !== "resolved" && (
                <div className="flex space-x-3 ml-4">
                  <button
                    onClick={() => handleStatusUpdate(rescue.id, "resolved")}
                    className="bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition font-medium shadow-sm"
                  >
                    Mark Resolved ✅
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VolunteerDashboard;
