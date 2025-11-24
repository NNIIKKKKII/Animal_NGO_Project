// animal-ngo-frontend/src/pages/VolunteerDashboard.jsx
import React, { useState, useEffect } from "react";
import { getMyCases, updateCaseStatus } from "../api/rescueService";
import { useAuth } from "../context/AuthContext";

const VolunteerDashboard = () => {
  const [myCases, setMyCases] = useState([]);
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
    try {
      await updateCaseStatus(caseId, newStatus);
      // Refresh the list locally
      setMyCases((prev) =>
        prev.map((c) => (c.id === caseId ? { ...c, status: newStatus } : c))
      );
    } catch (err) {
      alert("Failed to update status.");
    }
  };

  if (loading)
    return <div className="p-8 text-center">Loading your assignments...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        My Assigned Cases 📋
      </h1>

      {myCases.length === 0 ? (
        <p className="text-gray-500 text-lg">
          You have not accepted any cases yet.
        </p>
      ) : (
        <div className="space-y-4">
          {myCases.map((rescue) => (
            <div
              key={rescue.id}
              className="bg-white p-6 rounded-xl shadow border border-gray-100 flex flex-col md:flex-row justify-between items-center"
            >
              <div className="mb-4 md:mb-0">
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
                </div>
                <p className="text-gray-600">{rescue.description}</p>
              </div>

              {/* Action Buttons */}
              {rescue.status !== "resolved" && (
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleStatusUpdate(rescue.id, "resolved")}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-medium"
                  >
                    Mark as Resolved ✅
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
