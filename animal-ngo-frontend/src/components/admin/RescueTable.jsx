import React, { useState } from "react";
import StatusBadge from "./StatusBadge";
import { assignVolunteerToRescue } from "../../api/adminService";

const RescueTable = ({ rescueCases = [] }) => {
  const [selectedRescue, setSelectedRescue] = useState(null);
  const [volunteerId, setVolunteerId] = useState("");
  const [assigning, setAssigning] = useState(false);
  const [assignError, setAssignError] = useState("");

  const handleAssign = async () => {
    if (!volunteerId.trim()) {
      setAssignError("Enter a volunteer ID.");
      return;
    }
    setAssigning(true);
    setAssignError("");
    try {
      await assignVolunteerToRescue(selectedRescue.rawId, volunteerId);
      setSelectedRescue(null);
      setVolunteerId("");
    } catch (err) {
      setAssignError(err.response?.data?.message || "Assignment failed.");
    } finally {
      setAssigning(false);
    }
  };

  return (
    <>
      <div className="app-card-strong overflow-hidden">
        <div className="app-table-wrap">
          <table className="app-table min-w-full">
            <thead>
              <tr>
                {["Ref ID", "Title / Location", "Status", "Volunteer", "Action"].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rescueCases.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-sm text-[#8a726d]">
                    No active rescue cases
                  </td>
                </tr>
              ) : (
                rescueCases.map((rc) => (
                  <tr key={rc.id} className="transition-colors hover:bg-[#fff4f4]">
                    <td className="font-mono font-bold text-[#b83d55]">#{rc.id}</td>
                    <td>
                      <div className="font-semibold uppercase text-[#3f302d]">{rc.type}</div>
                      <div className="text-xs uppercase text-[#8f7670]">{rc.location}</div>
                    </td>
                    <td>
                      <StatusBadge status={rc.status} />
                    </td>
                    <td className="text-sm font-semibold uppercase">{rc.volunteer}</td>
                    <td className="text-right">
                      <button
                        onClick={() => {
                          setSelectedRescue(rc);
                          setVolunteerId("");
                          setAssignError("");
                        }}
                        className="text-xs font-semibold uppercase tracking-[0.12em] text-[#b83d55] hover:text-[#9e3147]"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedRescue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="app-card-strong w-full max-w-md p-6">
            <h3 className="app-title text-2xl">
              Assign Volunteer - Case #{selectedRescue.id}
            </h3>

            <input
              type="number"
              placeholder="Volunteer ID"
              value={volunteerId}
              onChange={(e) => setVolunteerId(e.target.value)}
              className="app-input mt-4"
            />

            {assignError && <p className="mt-3 text-sm text-[#9f2f3c]">{assignError}</p>}

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setSelectedRescue(null)}
                className="app-btn app-btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleAssign}
                disabled={assigning}
                className="app-btn app-btn-primary"
              >
                {assigning ? "Assigning..." : "Assign"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RescueTable;
