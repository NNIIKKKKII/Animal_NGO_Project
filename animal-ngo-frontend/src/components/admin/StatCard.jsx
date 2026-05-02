import React from "react";

const StatCard = ({ label, value }) => {
  return (
    <div className="app-card-strong p-6 transition duration-300 hover:-translate-y-1">
      <p className="app-label">{label}</p>
      <p className="mt-2 font-serif text-4xl font-bold tracking-[-0.03em] text-[#2f2321]">
        {value}
      </p>
    </div>
  );
};

export default StatCard;
