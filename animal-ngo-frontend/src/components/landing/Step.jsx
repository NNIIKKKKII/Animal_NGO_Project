const Step = ({ number, title, description, delayClass = "" }) => {
  return (
    <article
      className={`landing-fade-up ${delayClass} rounded-xl border border-[#eadfd8] bg-white p-6 shadow-[0_16px_40px_rgba(97,74,64,0.06)] transition-transform duration-200 hover:-translate-y-1`}
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#c0392b] text-sm font-bold text-white">
        {number}
      </div>
      <h3 className="text-lg font-semibold text-[#1f1d1b]">{title}</h3>
      <p className="mt-3 leading-7 text-[#5d5753]">{description}</p>
    </article>
  );
};

export default Step;
