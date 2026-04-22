const Stat = ({ value, label }) => {
  return (
    <div className="flex-1 border-l border-[#e6d9d1] px-5 first:border-l-0 first:pl-0 last:pr-0">
      <p className="text-3xl font-bold tracking-tight text-[#1f1d1b] md:text-4xl">
        {value}
      </p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#8c6d61]">
        {label}
      </p>
    </div>
  );
};

export default Stat;
