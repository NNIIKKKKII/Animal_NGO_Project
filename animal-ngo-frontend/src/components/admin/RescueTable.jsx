import React from "react";
import StatusBadge from "./StatusBadge";
import { useState } from "react";
import { assignVolunteerToRescue } from "../../api/adminService";

const RescueTable = ({ rescueCases = [] }) => {
  const [selectedRescue, setSelectedRescue] = useState(null);
  const [volunteerId, setVolunteerId] = useState("");

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Ref ID
              </th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Category / Priority
              </th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Status
              </th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Volunteer
              </th>
              <th className="px-6 py-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {rescueCases.map((rc) => (
              <tr
                key={rc.id}
                className="hover:bg-indigo-50/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="font-mono font-black text-indigo-600">
                    {rc.id}
                  </div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase">
                    {rc.location}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="text-xs font-black uppercase text-gray-800">
                    {rc.type}
                  </div>
                  <span className="text-[9px] font-black uppercase text-orange-500 tracking-widest">
                    {rc.priority} LVL
                  </span>
                </td>

                <td className="px-6 py-4">
                  <StatusBadge status={rc.status} />
                </td>

                <td className="px-6 py-4">
                  <div className="text-[11px] font-bold uppercase text-gray-700">
                    {rc.volunteer || "Unassigned"}
                  </div>
                </td>

                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => setSelectedRescue(rc)}
                    className="text-indigo-600 font-black text-[10px] uppercase hover:underline"
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))}

            
            {selectedRescue && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                <div className="bg-white p-6 rounded-xl w-96">
                  <h3 className="font-black mb-4">Assign Volunteer</h3>

                  <input
                    placeholder="Volunteer ID"
                    value={volunteerId}
                    onChange={(e) => setVolunteerId(e.target.value)}
                    className="border w-full px-3 py-2 mb-4"
                  />

                  <div className="flex justify-end gap-2">
                    <button onClick={() => setSelectedRescue(null)}>
                      Cancel
                    </button>
                    <button
                      onClick={async () => {
                        await assignVolunteerToRescue(
                          selectedRescue.rawId,
                          volunteerId
                        );
                        setSelectedRescue(null);
                      }}
                      className="bg-indigo-600 text-white px-4 py-2 rounded"
                    >
                      Assign
                    </button>
                  </div>
                </div>
              </div>
            )}

            {rescueCases.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-gray-400 text-xs font-bold uppercase"
                >
                  No active rescue cases
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RescueTable;
