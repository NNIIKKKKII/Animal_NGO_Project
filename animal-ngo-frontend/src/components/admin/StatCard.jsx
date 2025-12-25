import React from "react";

const StatCard = ({ label, value, accent = "border-indigo-600" }) => {
  return (
    <div
      className={`bg-white p-6 rounded-2xl shadow-sm border-l-4 ${accent} transition-transform hover:scale-[1.02]`}
    >
      <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">
        {label}
      </p>
      <p className="text-3xl font-black text-gray-900 mt-1 tracking-tighter">
        {value}
      </p>
    </div>
  );
};

export default StatCard;
