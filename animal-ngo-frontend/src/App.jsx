import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,

  Navigate,
} from "react-router-dom";
//authentication
// import { useAuth } from "./context/AuthContext";
import useStore from "./stores/store.js";

import { Dashboard } from "./pages/Dashboard.jsx";
import Navbar from "./components/Navbar.jsx";

// login and register pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

// Donation pages
import DonationFeed from "./pages/DonationFeed.jsx";
import CreateDonation from "./pages/CreateDonation";

// volunteer pages
import NearbyCases from "./pages/NearbyCases";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import ReportRescue from "./pages/ReportRescue";
import MyRescues from "./pages/MyRescues.jsx";
import MyAssignedRescues from "./pages/MyAssignedRescues.jsx";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";

// ngo pages
import LoginNgo from "./pages/LoginNgo";
import NgoDashboard from "./pages/NgoDashboard";
import NgoProfile from "./pages/NgoProfile";
import RegisterNgo from "./pages/RegisterNgo";

// Lost Pet pages
import ReportLostPet from "./pages/ReportLostPet";
import LostPetsFeed from "./pages/LostPetsFeed";

// anonoymous components

// import { register } from "./api/authService.js";

// Acts as a security guard for routes based on user role
const ProtectedRoute = ({ element, requiredRole }) => {
  // const { isAuthenticated, isLoading, user } = useAuth();
  const user = useStore((state) => state.user);
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const isLoading = useStore((state) => state.isLoading);


  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (requiredRole && user.role !== requiredRole)
    //If requiredRole is not given then this condition gets skipped
    return <Navigate to="/" replace />;
  return element;
};

const NotFound = () => (
  <h1 className="text-4xl text-red-500 p-8 text-center">404 - Not Found</h1>
);

// ----------------------------------------------------------------
// Dashboard Component (Updated with Role-Based Links)
// ----------------------------------------------------------------

// ----------------------------------------------------------------
// App Component (Updated with New Routes)
// ----------------------------------------------------------------
function App() {
  // const { isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="p-0 m-0">
        <Routes>
          {/* Public Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/donations" element={<DonationFeed />} />
          <Route path="/ngo/register" element={<RegisterNgo />} />
          <Route path="/ngo/login" element={<LoginNgo />} />
          <Route path="/ngo/dashboard" element={<NgoDashboard />} />
          <Route path="/ngo/:id" element={<NgoProfile />} />
          <Route path="/lost-pets/report" element={<ReportLostPet />} />
          <Route path="/lost-pets" element={<LostPetsFeed />} />
          <Route path="*" element={<NotFound />} />
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





          {/* ISSUE HERE  voluteer doesnt has this feature to report a case only donor has the control*/}
          <Route
            path="/volunteer/cases"
            element={<ProtectedRoute element={<VolunteerDashboard />} />}
          />
          <Route
            path="/rescue/my-assigned"
            element={<ProtectedRoute element={<MyAssignedRescues />} />}
          />
          {/* ISSUE HERE */}



          {/* Protected Routes */}
          <Route
            path="/profile"
            element={<ProtectedRoute element={<Profile />} />}
          />{" "}

          {/* this page is for donor and the component name is BULLSHIT */}
          <Route
            path="/rescue/my-reports"
            element={<ProtectedRoute element={<MyRescues />} />}
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute
                requiredRole="admin"
                element={<AdminDashboard />}
              />
            }
          />


          <Route
            path="/admin/users"
            element={
              <ProtectedRoute requiredRole="admin" element={<AdminUsers />} />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
