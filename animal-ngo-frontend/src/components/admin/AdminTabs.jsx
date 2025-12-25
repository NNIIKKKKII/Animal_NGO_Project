import React from "react";

const AdminTabs = ({ activeTab, onChange }) => {
  return (
    <div className="inline-flex bg-gray-100 p-1 rounded-xl shadow-inner">
      <button
        onClick={() => onChange("overview")}
        className={`px-6 py-2 rounded-lg text-[10px] font-black tracking-widest transition-all ${
          activeTab === "overview"
            ? "bg-white shadow-sm text-indigo-600"
            : "text-gray-400 hover:text-gray-600"
        }`}
      >
        OVERVIEW
      </button>

      <button
        onClick={() => onChange("rescues")}
        className={`px-6 py-2 rounded-lg text-[10px] font-black tracking-widest transition-all ${
          activeTab === "rescues"
            ? "bg-white shadow-sm text-indigo-600"
            : "text-gray-400 hover:text-gray-600"
        }`}
      >
        RESCUE LOGS
      </button>
    </div>
  );
};

export default AdminTabs;
