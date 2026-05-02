import React from "react";

const STATUS_STYLES = {
  Pending: "bg-[#fff3da] text-[#8e6422] border-[#f0ddb8]",
  "In Progress": "bg-[#ffeef1] text-[#a93a4f] border-[#efc8cf]",
  Dispatched: "bg-[#f7e9ee] text-[#933548] border-[#ebc7d1]",
  Resolved: "bg-[#e8f5ee] text-[#2b6d4d] border-[#c7e6d3]",
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`px-2 py-1 rounded text-[10px] font-semibold uppercase tracking-[0.12em] border ${
        STATUS_STYLES[status] || "bg-[#f6efee] text-[#7d6661] border-[#e8d7d4]"
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
