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
      {/* Table */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50/50">
              <tr>
                {["Ref ID", "Title / Location", "Status", "Volunteer", "Action"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {rescueCases.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-gray-400 text-xs font-bold uppercase"
                  >
                    No active rescue cases
                  </td>
                </tr>
              ) : (
                rescueCases.map((rc) => (
                  <tr key={rc.id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="px-6 py-4 font-mono font-black text-indigo-600">
                      #{rc.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs font-black uppercase text-gray-800">
                        {rc.type}
                      </div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase">
                        {rc.location}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={rc.status} />
                    </td>
                    <td className="px-6 py-4 text-[11px] font-bold uppercase text-gray-700">
                      {rc.volunteer}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedRescue(rc);
                          setVolunteerId("");
                          setAssignError("");
                        }}
                        className="text-indigo-600 font-black text-[10px] uppercase hover:underline"
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

      {/* Modal — outside the table, inside the fragment */}
      {selectedRescue && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 space-y-4 shadow-2xl">
            <h3 className="font-black text-lg">
              Assign Volunteer — Case #{selectedRescue.id}
            </h3>

            <input
              type="number"
              placeholder="Volunteer ID"
              value={volunteerId}
              onChange={(e) => setVolunteerId(e.target.value)}
              className="border w-full px-3 py-2 rounded"
            />

            {assignError && (
              <p className="text-red-600 text-sm font-bold">{assignError}</p>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedRescue(null)}
                className="px-4 py-2 text-sm font-bold text-gray-600 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleAssign}
                disabled={assigning}
                className="bg-indigo-600 text-white px-4 py-2 rounded font-bold text-sm disabled:opacity-50"
              >
                {assigning ? "Assigning…" : "Assign"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RescueTable;