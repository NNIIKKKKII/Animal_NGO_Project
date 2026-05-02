import useStore from "../stores/store.js";

const NgoDashboard = () => {
  const ngo = useStore((state) => state.ngo);

  if (!ngo) return <p>Unauthorized</p>;

  return (
    <div className="app-page">
      <div className="app-shell">
        <div className="app-card p-8 md:p-10">
          <p className="app-label">NGO Command</p>
          <h1 className="app-title mt-3 text-5xl">Welcome, {ngo.name}</h1>
          <p className="app-subtitle mt-3">
            Manage your organization profile and rescue collaboration from this dashboard.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="app-card-strong p-5">
              <p className="text-sm text-[#7d6661]">NGO ID</p>
              <p className="mt-2 text-xl font-semibold text-[#2f2321]">{ngo.id}</p>
            </div>
            <div className="app-card-strong p-5">
              <p className="text-sm text-[#7d6661]">Verification Status</p>
              <p className="mt-2 text-xl font-semibold text-[#2b6d4d]">Verified</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NgoDashboard;
