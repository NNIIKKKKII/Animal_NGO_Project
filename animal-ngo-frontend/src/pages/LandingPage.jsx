import { Link } from "react-router-dom";
import catImage from "../assets/pics/cat.jpg";
import FeatureCard from "../components/landing/FeatureCard.jsx";
import Stat from "../components/landing/Stat.jsx";
import Step from "../components/landing/Step.jsx";

const volunteerImage =
  "https://images.pexels.com/photos/35231854/pexels-photo-35231854.jpeg?cs=srgb&dl=pexels-sims1217-35231854.jpg&fm=jpg";
const reunionImage =
  "https://images.pexels.com/photos/5257630/pexels-photo-5257630.jpeg?cs=srgb&dl=pexels-samson-katt-5257630.jpg&fm=jpg";

const stats = [
  { value: "24", label: "Live Rescue Cases" },
  { value: "58", label: "Active Volunteers Nearby" },
  { value: "Rs. 1.2L", label: "Donations Raised" },
  { value: "31", label: "Pets Reunited" },
];

const features = [
  {
    icon: "RC",
    title: "Rescue Coordination",
    description:
      "Report injured or stray animals with location. Nearby volunteers can instantly accept and act.",
  },
  {
    icon: "DN",
    title: "Support with Donations",
    description:
      "Create or contribute to verified donation requests for food, treatment, and care.",
  },
  {
    icon: "LP",
    title: "Lost & Found Pets",
    description:
      "Post lost pets with images and contact info. Reach a public feed to reconnect families faster.",
  },
  {
    icon: "RB",
    title: "Built for Every Role",
    description:
      "Donors, volunteers, NGOs, and admins each get tools tailored to their responsibilities.",
  },
];

const steps = [
  {
    number: "1",
    title: "Animal is reported",
    description:
      "Someone reports an injured animal or urgent case with location details and notes.",
  },
  {
    number: "2",
    title: "Nearby volunteer accepts case",
    description:
      "Volunteers see nearby rescue alerts and immediately assign themselves to respond.",
  },
  {
    number: "3",
    title: "Rescue and updates are tracked",
    description:
      "The case stays visible through status updates until the response is completed.",
  },
  {
    number: "4",
    title: "Donations support treatment",
    description:
      "Donation requests help cover food, medicine, treatment, and follow-up care.",
  },
  {
    number: "5",
    title: "Animal is rescued or reunited",
    description:
      "The platform supports rescue outcomes and lost-pet reunions through public visibility.",
  },
];

const roles = [
  {
    title: "Donor",
    body: "Report cases, fund rescue, track impact",
  },
  {
    title: "Volunteer",
    body: "Find nearby cases, accept missions, update status",
  },
  {
    title: "NGO",
    body: "Manage operations, expand rescue network",
  },
];

const LandingPage = () => {
  return (
    <div className="overflow-hidden bg-[#fff8f6] text-[#221c1a]">
      <section className="relative isolate">
        <div className="landing-cinema-glow landing-cinema-glow-one" />
        <div className="landing-cinema-glow landing-cinema-glow-two" />
        <div className="landing-cinema-glow landing-cinema-glow-three" />

        <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl items-center gap-12 px-6 pb-20 pt-16 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28 lg:pt-24">
          <div className="landing-fade-up relative z-10 max-w-3xl">
            <p className="inline-flex rounded-full border border-[#f0d7d2] bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#b74d59] shadow-[0_10px_24px_rgba(180,101,101,0.08)] backdrop-blur">
              Animal Rescue Network
            </p>

            <h1 className="mt-7 max-w-4xl font-serif text-6xl font-bold leading-[0.88] tracking-[-0.04em] text-[#221c1a] md:text-7xl lg:text-[6.1rem]">
              Compassion in Action for Every Animal in Need
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#5c4a48] md:text-xl">
              Report injured animals, coordinate rescues, support treatment
              through donations, and reunite lost pets - all in one unified
              platform.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/rescue/report"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#cd5b66] via-[#c74758] to-[#b83d55] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(196,78,101,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_52px_rgba(196,78,101,0.34)]"
              >
                Report a Rescue
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-xl border border-[#e6b8bf] bg-white/85 px-7 py-3.5 text-sm font-semibold text-[#b53f53] shadow-[0_12px_28px_rgba(194,139,139,0.12)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#fff0f2]"
              >
                Join as Volunteer
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-5 text-sm font-medium text-[#7b6661]">
              <Link to="/donations" className="transition hover:text-[#b83d55]">
                Browse Donations
              </Link>
              <Link to="/lost-pets" className="transition hover:text-[#b83d55]">
                Lost Pets Feed
              </Link>
              <Link
                to="/ngo/register"
                className="transition hover:text-[#b83d55]"
              >
                NGO Registration
              </Link>
            </div>
          </div>

          <div className="landing-fade-up landing-delay-1 relative z-10 flex min-h-[34rem] items-center justify-center lg:min-h-[44rem]">
            <div className="landing-blob landing-blob-one border border-white/70 bg-white/25 p-2">
              <img
                src={catImage}
                alt="Rescued cat resting safely"
                className="h-full w-full rounded-[inherit] object-cover"
              />
            </div>
            <div className="landing-blob landing-blob-two border border-white/70 bg-white/25 p-2">
              <img
                src={volunteerImage}
                alt="Volunteer caring for rescued dogs at a shelter"
                className="h-full w-full rounded-[inherit] object-cover"
              />
            </div>
            <div className="landing-blob landing-blob-three border border-white/70 bg-white/25 p-2">
              <img
                src={reunionImage}
                alt="Pet owner hugging a reunited dog"
                className="h-full w-full rounded-[inherit] object-cover"
              />
            </div>
            <div className="landing-accent-orb landing-accent-orb-one" />
            <div className="landing-accent-orb landing-accent-orb-two" />
            <div className="landing-ring landing-ring-one" />
            <div className="landing-ring landing-ring-two" />
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-8 md:px-10">
        <div className="landing-fade-up landing-delay-2 rounded-[30px] border border-[#f0dbd8] bg-white/88 px-6 py-8 shadow-[0_28px_60px_rgba(139,98,86,0.09)] backdrop-blur md:px-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-0">
            {stats.map((item) => (
              <Stat key={item.label} value={item.value} label={item.label} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="landing-section-tint landing-section-tint-one" />
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <div className="landing-fade-up max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b9505d]">
              Built around real rescue work
            </p>
            <h2 className="mt-5 font-serif text-5xl font-bold leading-[0.95] tracking-[-0.03em] text-[#221c1a] md:text-6xl">
              One platform for rescue coordination, funding, visibility, and
              follow-through.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delayClass={`landing-delay-${(index % 3) + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="landing-fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b9505d]">
              How it works
            </p>
            <h2 className="mt-5 font-serif text-5xl font-bold leading-[0.95] tracking-[-0.03em] text-[#221c1a] md:text-6xl">
              A rescue pipeline people can actually act on.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#5c4a48]">
              The system connects urgent reports, nearby volunteer response,
              donation-backed treatment, and public lost-pet visibility in one
              coordinated flow.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {steps.map((step, index) => (
              <Step
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.description}
                delayClass={`landing-delay-${(index % 3) + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="landing-section-tint landing-section-tint-two" />
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="landing-fade-up">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b9505d]">
                Who it serves
              </p>
              <h2 className="mt-5 font-serif text-5xl font-bold leading-[0.95] tracking-[-0.03em] text-[#221c1a] md:text-6xl">
                Clear tools for the people who make rescue possible.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#5c4a48]">
                Pet owners can report urgent cases and lost pets, while admins
                oversee rescue flow, people, and accountability across the
                network.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {roles.map((role, index) => (
                <div
                  key={role.title}
                  className={`landing-fade-up landing-delay-${(index % 3) + 1} rounded-[28px] border border-[#efd7d7] bg-white/90 p-8 shadow-[0_24px_55px_rgba(126,89,89,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1`}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#bc6570]">
                    Role
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold text-[#221c1a]">
                    {role.title}
                  </h3>
                  <p className="mt-4 leading-7 text-[#5c4a48]">{role.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="landing-fade-up grid gap-10 rounded-[36px] border border-[#f0dbd8] bg-white/92 p-8 shadow-[0_28px_65px_rgba(126,89,89,0.1)] backdrop-blur md:p-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="overflow-hidden rounded-[28px] shadow-[0_18px_40px_rgba(126,89,89,0.12)]">
            <img
              src={volunteerImage}
              alt="Volunteer caring for rescued animals"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b9505d]">
              Trust from the field
            </p>
            <blockquote className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-[-0.03em] text-[#221c1a] md:text-5xl">
              "This platform helped us respond faster and save more animals than
              ever before."
            </blockquote>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#5c4a48] md:text-lg">
              Rescue coordination works best when reports, volunteers, support,
              and updates all live in one place. That is exactly what your
              platform is built to do.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 pt-8 md:px-10">
        <div className="landing-fade-up mx-auto max-w-7xl overflow-hidden rounded-[40px] bg-gradient-to-r from-[#c84d67] via-[#d95f77] to-[#e57d8a] px-8 py-14 text-white shadow-[0_30px_75px_rgba(199,80,109,0.28)] md:px-12 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
                Be part of the rescue network
              </p>
              <h2 className="mt-4 max-w-3xl font-serif text-5xl font-bold leading-[0.95] tracking-[-0.03em] md:text-6xl">
                Be part of the rescue network
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/85">
                Whether you donate, volunteer, or report - every action saves a
                life.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 lg:justify-end">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#bf4860] transition hover:-translate-y-0.5 hover:bg-[#fff2f4]"
              >
                Join Now
              </Link>
              <Link
                to="/rescue/report"
                className="inline-flex items-center justify-center rounded-xl border border-white/60 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                Report a Case
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
