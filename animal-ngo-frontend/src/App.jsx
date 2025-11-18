import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useAuth } from "./context/AuthContext";

// ----------------------------------------------------------------
// ProtectedRoute Component (no changes)
// ----------------------------------------------------------------
const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading)
    return <div className="p-8 text-center text-xl">Loading...</div>;
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

// ----------------------------------------------------------------
// Placeholder Pages (we will build these in later days)
// ----------------------------------------------------------------
const ReportRescue = () => (
  <h2 className="p-8 text-2xl font-bold">Report a New Rescue Case</h2>
);
const NearbyCases = () => (
  <h2 className="p-8 text-2xl font-bold">Nearby Cases (Volunteer View)</h2>
);
const DonationFeed = () => (
  <h2 className="p-8 text-2xl font-bold">Donation Request Feed</h2>
);
const CreateDonation = () => (
  <h2 className="p-8 text-2xl font-bold">Create New Donation Request</h2>
);
const NotFound = () => (
  <h1 className="text-4xl text-red-500 p-8">404 - Not Found</h1>
);

// ----------------------------------------------------------------
// Dashboard Component (Updated with Role-Based Links)
// ----------------------------------------------------------------
const Dashboard = () => {
  const { user, logout } = useAuth();
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-green-600 mb-6">
        Welcome, {user.name}!
      </h2>

      <div className="space-y-6">
        {/* ---------- DONOR ACTIONS ---------- */}
        {user.role === "donor" && (
          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Donor Actions</h3>
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Link
                to="/rescue/report"
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-center"
              >
                Report New Rescue 🚨
              </Link>
              <Link
                to="/donations/new"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center"
              >
                Request a Donation 📦
              </Link>
            </div>
          </div>
        )}

        {/* ---------- VOLUNTEER ACTIONS ---------- */}
        {user.role === "volunteer" && (
          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Volunteer Actions</h3>
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Link
                to="/rescue/nearby"
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-center"
              >
                Find Nearby Cases 🗺️
              </Link>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={logout}
        className="mt-8 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

// ----------------------------------------------------------------
// App Component (Updated with New Routes)
// ----------------------------------------------------------------
function App() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm">
        <Link to="/" className="text-lg font-semibold text-gray-800">
          Animal NGO App
        </Link>
        <nav className="flex items-center space-x-4">
          <Link
            to="/donations"
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            Donation Feed
          </Link>

          {isAuthenticated ? (
            <button
              onClick={logout}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Login
              </Link>
            </>
          )}
        </nav>
      </header>

      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/donations" element={<DonationFeed />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
          <Route
            path="/rescue/report"
            element={<ProtectedRoute element={<ReportRescue />} />}
          />
          <Route
            path="/rescue/nearby"
            element={<ProtectedRoute element={<NearbyCases />} />}
          />
          <Route
            path="/donations/new"
            element={<ProtectedRoute element={<CreateDonation />} />}
          />

          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

// App Wrapper (no changes)
export default App;
