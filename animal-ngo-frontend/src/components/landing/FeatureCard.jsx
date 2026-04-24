const FeatureCard = ({ icon, title, description, delayClass = "" }) => {
  return (
    <article
      className={`landing-fade-up ${delayClass} rounded-[28px] border border-[#efd9d6] bg-white/92 p-7 shadow-[0_24px_55px_rgba(126,89,89,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_65px_rgba(126,89,89,0.12)]`}
    >
      <div className="mb-5 inline-flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-[#fff0ef] to-[#fde5e9] px-3 text-sm font-bold tracking-[0.18em] text-[#be4f61] shadow-[0_12px_25px_rgba(205,124,140,0.16)]">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold leading-tight text-[#221c1a]">
        {title}
      </h3>
      <p className="mt-4 leading-7 text-[#5d4c49]">{description}</p>
    </article>
  );
};

export default FeatureCard;
