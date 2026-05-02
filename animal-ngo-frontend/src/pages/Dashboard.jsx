import useStore from "../stores/store.js";
import VideoBackgroundforDog from "../components/VideoBackgroundforDog.jsx";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const user = useStore((state) => state.user);

  const actionStyle =
    "app-card-strong flex flex-col items-center justify-center rounded-2xl p-6 text-center font-semibold text-[#3f2f2b] transition duration-300 hover:-translate-y-1";

  return (
    <VideoBackgroundforDog>
      <div className="app-shell px-4 py-6">
        <div className="app-card p-8 md:p-10">
          <p className="app-label text-center">Command Center</p>
          <h2 className="app-title mt-3 text-center text-5xl">
            Welcome, {user?.name}
          </h2>
          <p className="app-subtitle mx-auto mt-4 max-w-2xl text-center">
            Keep rescue response, reporting, and coordination moving from one place.
          </p>

          {user?.role === "donor" && (
            <div className="mt-10">
              <h3 className="app-title text-center text-3xl">Donor Dashboard</h3>
              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
                <Link to="/rescue/report" className={actionStyle}>
                  <span className="app-label">Action</span>
                  <span className="mt-2 text-xl">Report Rescue</span>
                </Link>
                <Link to="/rescue/my-reports" className={actionStyle}>
                  <span className="app-label">Tracking</span>
                  <span className="mt-2 text-xl">Track My Reports</span>
                </Link>
                <Link to="/donations/new" className={actionStyle}>
                  <span className="app-label">Support</span>
                  <span className="mt-2 text-xl">Request Donation</span>
                </Link>
              </div>
            </div>
          )}

          {user?.role === "volunteer" && (
            <div className="mt-10">
              <h3 className="app-title text-center text-3xl">Volunteer Missions</h3>
              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
                <Link to="/rescue/my-assigned" className={actionStyle}>
                  <span className="app-label">Queue</span>
                  <span className="mt-2 text-xl">Active Missions</span>
                </Link>
                <Link to="/rescue/nearby" className={actionStyle}>
                  <span className="app-label">Discovery</span>
                  <span className="mt-2 text-xl">Nearby Cases</span>
                </Link>
                <Link to="/volunteer/cases" className={actionStyle}>
                  <span className="app-label">Operations</span>
                  <span className="mt-2 text-xl">Assigned Cases</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </VideoBackgroundforDog>
  );
};
