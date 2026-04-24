const Stat = ({ value, label }) => {
  return (
    <div className="flex-1 border-l border-[#efddda] px-5 first:border-l-0 first:pl-0 last:pr-0">
      <p className="font-serif text-4xl font-bold tracking-[-0.04em] text-[#221c1a] md:text-5xl">
        {value}
      </p>
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#a77a75]">
        {label}
      </p>
    </div>
  );
};

export default Stat;
