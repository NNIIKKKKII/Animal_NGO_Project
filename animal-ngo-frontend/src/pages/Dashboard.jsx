// import { useAuth } from "../context/AuthContext.jsx";
import useStore from "../stores/store.js"
import LocationTracker from "../components/LocationTracker.jsx";
import VideoBackgroundforDog from "../components/VideoBackgroundforDog.jsx";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  // const { user } = useAuth();
  const user = useStore((state) => state.user);

  const cardStyle =
    "backdrop-blur-lg bg-white/30 border border-white/40 shadow-xl rounded-xl p-6 hover:scale-105 transition";

  const actionStyle =
    "flex flex-col items-center justify-center text-center p-6 rounded-xl shadow-md text-white font-semibold hover:scale-105 transition";

  return (
    <VideoBackgroundforDog>

      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Welcome */}
        <h2 className="text-4xl font-bold text-white mb-10 text-center drop-shadow-lg">
          Welcome, {user.name} 👋
        </h2>

        {/* DONOR DASHBOARD */}
        {user.role === "donor" && (
          <div className={cardStyle}>

            <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              Donor Dashboard
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <Link
                to="/rescue/report"
                className={`${actionStyle} bg-red-500 hover:bg-red-600`}
              >
                🚨
                <span className="mt-2">Report Rescue</span>
              </Link>

              <Link
                to="/rescue/my-reports"
                className={`${actionStyle} bg-purple-500 hover:bg-purple-600`}
              >
                📢
                <span className="mt-2">Track My Reports</span>
              </Link>

              <Link
                to="/donations/new"
                className={`${actionStyle} bg-blue-500 hover:bg-blue-600`}
              >
                📦
                <span className="mt-2">Request Donation</span>
              </Link>

            </div>

          </div>
        )}

        {/* VOLUNTEER DASHBOARD */}
        {user.role === "volunteer" && (
          <div className="space-y-6">

            {/* Location tracker */}
            {/* <div className={cardStyle}>
              <LocationTracker />
            </div> */}

            <div className={cardStyle}>

              <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                Volunteer Missions
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <Link
                  to="/rescue/my-assigned"
                  className={`${actionStyle} bg-indigo-500 hover:bg-indigo-600`}
                >
                  🚀
                  <span className="mt-2">Active Missions</span>
                </Link>

                <Link
                  to="/rescue/nearby"
                  className={`${actionStyle} bg-blue-500 hover:bg-blue-600`}
                >
                  🗺️
                  <span className="mt-2">Nearby Cases</span>
                </Link>

                <Link
                  to="/volunteer/cases"
                  className={`${actionStyle} bg-purple-500 hover:bg-purple-600`}
                >
                  📋
                  <span className="mt-2">Assigned Cases</span>
                </Link>

              </div>

            </div>

          </div>
        )}

      </div>

    </VideoBackgroundforDog>
  );
};