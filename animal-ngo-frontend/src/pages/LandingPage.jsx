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
    <div className="bg-[#f9f6f4] text-[#1f1d1b]">
      <section className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl items-center gap-12 px-6 py-16 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div className="landing-fade-up max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c0392b]">
            ANIMAL RESCUE NETWORK
          </p>
          <h1 className="mt-5 max-w-3xl font-serif text-5xl font-bold leading-[0.95] text-[#1f1d1b] md:text-6xl lg:text-7xl">
            Compassion in Action for Every Animal in Need
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5d5753]">
            Report injured animals, coordinate rescues, support treatment
            through donations, and reunite lost pets - all in one unified
            platform.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/rescue/report"
              className="inline-flex items-center justify-center rounded-xl bg-[#c0392b] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_35px_rgba(192,57,43,0.24)] transition hover:-translate-y-0.5 hover:bg-[#a73124]"
            >
              Report a Rescue
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-xl border border-[#c0392b] px-6 py-3 text-sm font-semibold text-[#c0392b] transition hover:-translate-y-0.5 hover:bg-[#fff1ee]"
            >
              Join as Volunteer
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap gap-5 text-sm font-medium text-[#6c615b]">
            <Link to="/donations" className="transition hover:text-[#c0392b]">
              Browse Donations
            </Link>
            <Link to="/lost-pets" className="transition hover:text-[#c0392b]">
              Lost Pets Feed
            </Link>
            <Link
              to="/ngo/register"
              className="transition hover:text-[#c0392b]"
            >
              NGO Registration
            </Link>
          </div>
        </div>

        <div className="landing-fade-up landing-delay-1 relative flex min-h-[30rem] items-center justify-center lg:min-h-[38rem]">
          <div className="landing-blob landing-blob-one">
            <img
              src={catImage}
              alt="Rescued cat resting safely"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="landing-blob landing-blob-two">
            <img
              src={volunteerImage}
              alt="Volunteer caring for rescued dogs at a shelter"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="landing-blob landing-blob-three">
            <img
              src={reunionImage}
              alt="Pet owner hugging a reunited dog"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="landing-accent-orb landing-accent-orb-one" />
          <div className="landing-accent-orb landing-accent-orb-two" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-6 md:px-10">
        <div className="landing-fade-up landing-delay-2 rounded-xl border border-[#eadfd8] bg-white px-6 py-8 shadow-[0_18px_45px_rgba(97,74,64,0.08)] md:px-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-0">
            {stats.map((item) => (
              <Stat key={item.label} value={item.value} label={item.label} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="landing-fade-up max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c0392b]">
            Built around real rescue work
          </p>
          <h2 className="mt-4 font-serif text-4xl font-bold leading-tight text-[#1f1d1b] md:text-5xl">
            One platform for rescue coordination, funding, visibility, and
            follow-through.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="landing-fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c0392b]">
              How it works
            </p>
            <h2 className="mt-4 font-serif text-4xl font-bold leading-tight text-[#1f1d1b] md:text-5xl">
              A rescue pipeline people can actually act on.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#5d5753]">
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

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="landing-fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c0392b]">
              Who it serves
            </p>
            <h2 className="mt-4 font-serif text-4xl font-bold leading-tight text-[#1f1d1b] md:text-5xl">
              Clear tools for the people who make rescue possible.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#5d5753]">
              Pet owners can report urgent cases and lost pets, while admins
              oversee rescue flow, people, and accountability across the
              network.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {roles.map((role, index) => (
              <div
                key={role.title}
                className={`landing-fade-up ${`landing-delay-${(index % 3) + 1}`} rounded-xl border border-[#eadfd8] bg-white p-7 shadow-[0_18px_45px_rgba(97,74,64,0.06)] transition-transform duration-200 hover:-translate-y-1`}
              >
                <h3 className="text-xl font-semibold text-[#1f1d1b]">
                  {role.title}
                </h3>
                <p className="mt-3 leading-7 text-[#5d5753]">{role.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="landing-fade-up grid gap-10 rounded-[28px] bg-white p-8 shadow-[0_20px_50px_rgba(97,74,64,0.08)] md:p-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="overflow-hidden rounded-[24px]">
            <img
              src={volunteerImage}
              alt="Volunteer caring for rescued animals"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c0392b]">
              Trust from the field
            </p>
            <blockquote className="mt-5 font-serif text-3xl font-semibold leading-tight text-[#1f1d1b] md:text-4xl">
              "This platform helped us respond faster and save more animals than
              ever before."
            </blockquote>
            <p className="mt-5 text-base leading-8 text-[#5d5753]">
              Rescue coordination works best when reports, volunteers, support,
              and updates all live in one place. That is exactly what your
              platform is built to do.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-10">
        <div className="landing-fade-up mx-auto max-w-7xl rounded-[32px] bg-gradient-to-r from-[#c0392b] via-[#c44b3d] to-[#d05b4d] px-8 py-14 text-white shadow-[0_26px_70px_rgba(192,57,43,0.25)] md:px-12 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
                Be part of the rescue network
              </p>
              <h2 className="mt-4 font-serif text-4xl font-bold leading-tight md:text-5xl">
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
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#c0392b] transition hover:bg-[#fff0ec]"
              >
                Join Now
              </Link>
              <Link
                to="/rescue/report"
                className="inline-flex items-center justify-center rounded-xl border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
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
