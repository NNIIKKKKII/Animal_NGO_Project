const FeatureCard = ({ icon, title, description, delayClass = "" }) => {
  return (
    <article
      className={`landing-fade-up ${delayClass} rounded-xl border border-[#eadfd8] bg-white p-7 shadow-[0_18px_45px_rgba(97,74,64,0.08)] transition-transform duration-200 hover:-translate-y-1`}
    >
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#fdf0ed] text-sm font-bold tracking-[0.18em] text-[#c0392b]">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-[#1f1d1b]">{title}</h3>
      <p className="mt-3 leading-7 text-[#5d5753]">{description}</p>
    </article>
  );
};

export default FeatureCard;
