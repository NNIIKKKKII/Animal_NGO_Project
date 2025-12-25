import React from "react";

const STATUS_STYLES = {
  Pending: "bg-orange-50 text-orange-700 border-orange-200",
  "In Progress": "bg-blue-50 text-blue-700 border-blue-200",
  Dispatched: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Resolved: "bg-green-50 text-green-700 border-green-200",
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest border ${
        STATUS_STYLES[status] || "bg-gray-100 text-gray-600 border-gray-200"
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
