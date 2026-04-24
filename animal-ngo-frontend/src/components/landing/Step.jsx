const Step = ({ number, title, description, delayClass = "" }) => {
  return (
    <article
      className={`landing-fade-up ${delayClass} rounded-[28px] border border-[#efd9d6] bg-white/92 p-6 shadow-[0_22px_50px_rgba(126,89,89,0.07)] backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_58px_rgba(126,89,89,0.11)]`}
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#d86176] to-[#bc4660] text-sm font-bold text-white shadow-[0_14px_24px_rgba(205,107,130,0.24)]">
        {number}
      </div>
      <h3 className="text-xl font-semibold leading-tight text-[#221c1a]">
        {title}
      </h3>
      <p className="mt-4 leading-7 text-[#5d4c49]">{description}</p>
    </article>
  );
};

export default Step;
