import React from "react";

const AdminTabs = ({ activeTab, onChange }) => {
  return (
    <div className="inline-flex rounded-xl border border-[#edd8d6] bg-white p-1 shadow-sm">
      <button
        onClick={() => onChange("overview")}
        className={`rounded-lg px-5 py-2 text-xs font-semibold tracking-[0.15em] transition ${
          activeTab === "overview"
            ? "bg-[#ffeef1] text-[#b83d55]"
            : "text-[#8a726d] hover:text-[#3f312e]"
        }`}
      >
        OVERVIEW
      </button>

      <button
        onClick={() => onChange("rescues")}
        className={`rounded-lg px-5 py-2 text-xs font-semibold tracking-[0.15em] transition ${
          activeTab === "rescues"
            ? "bg-[#ffeef1] text-[#b83d55]"
            : "text-[#8a726d] hover:text-[#3f312e]"
        }`}
      >
        RESCUE LOGS
      </button>
    </div>
  );
};

export default AdminTabs;
