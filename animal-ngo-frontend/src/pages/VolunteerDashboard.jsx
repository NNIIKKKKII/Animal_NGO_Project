import React, { useState, useEffect } from "react";
import { getMyAssignedRescues, updateCaseStatus } from "../api/rescueService";
import useStore from "../stores/store.js";

const VolunteerDashboard = () => {
  const [myCases, setMyCases] = useState([]);
  const [filter, setFilter] = useState("active");
  const [loading, setLoading] = useState(true);
  const user = useStore((state) => state.user);

  useEffect(() => {
    if (user?.role === "volunteer") {
      fetchMyAssignments();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchMyAssignments = async () => {
    try {
      const assignedCases = await getMyAssignedRescues();
      setMyCases(assignedCases);
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
      setMyCases((prev) =>
        prev.map((c) => (c.id === caseId ? { ...c, status: newStatus } : c))
      );
    } catch {
      alert("Failed to update status.");
    }
  };

  const displayedCases = myCases.filter((c) => {
    if (filter === "active") return c.status !== "resolved";
    if (filter === "resolved") return c.status === "resolved";
    return true;
  });

  if (loading) {
    return (
      <div className="app-page flex items-center justify-center text-xl text-[#6b5752]">
        Loading your assignments...
      </div>
    );
  }

  return (
    <div className="app-page">
      <div className="app-shell">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="app-label">Volunteer Operations</p>
            <h1 className="app-title mt-3 text-5xl">My Assignments</h1>
          </div>

          <div className="inline-flex rounded-xl border border-[#ebd4d1] bg-white p-1 shadow-sm">
            <button
              onClick={() => setFilter("active")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                filter === "active" ? "bg-[#ffeef1] text-[#b83d55]" : "text-[#7d6661] hover:text-[#3c302d]"
              }`}
            >
              Active Cases
            </button>
            <button
              onClick={() => setFilter("resolved")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                filter === "resolved" ? "bg-[#eaf8ef] text-[#2f7150]" : "text-[#7d6661] hover:text-[#3c302d]"
              }`}
            >
              Past History
            </button>
          </div>
        </div>

        {displayedCases.length === 0 ? (
          <div className="app-card p-10 text-center text-[#6b5752]">
            No {filter} cases found.
            {filter === "active" && " Great job clearing your queue!"}
          </div>
        ) : (
          <div className="space-y-4">
            {displayedCases.map((rescue) => (
              <div key={rescue.id} className="app-card p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h3 className="text-2xl font-semibold text-[#2d2220]">{rescue.title}</h3>
                      <span
                        className={`app-status ${
                          rescue.status === "resolved" ? "app-status-success" : "app-status-pending"
                        }`}
                      >
                        {rescue.status}
                      </span>
                      <span className="text-xs text-[#8f7670]">
                        reported on {new Date(rescue.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-[#5c4a48]">{rescue.description}</p>
                  </div>

                  {rescue.status !== "resolved" && (
                    <button
                      onClick={() => handleStatusUpdate(rescue.id, "resolved")}
                      className="app-btn app-btn-primary"
                    >
                      Mark Resolved
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerDashboard;
