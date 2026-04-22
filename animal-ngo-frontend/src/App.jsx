import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useStore from "./stores/store.js";

import { Dashboard } from "./pages/Dashboard.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Navbar from "./components/Navbar.jsx";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import DonationFeed from "./pages/DonationFeed.jsx";
import CreateDonation from "./pages/CreateDonation";

import NearbyCases from "./pages/NearbyCases";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import ReportRescue from "./pages/ReportRescue";
import MyRescues from "./pages/MyRescues.jsx";
import MyAssignedRescues from "./pages/MyAssignedRescues.jsx";

import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";

import LoginNgo from "./pages/LoginNgo";
import NgoDashboard from "./pages/NgoDashboard";
import NgoProfile from "./pages/NgoProfile";
import RegisterNgo from "./pages/RegisterNgo";

import ReportLostPet from "./pages/ReportLostPet";
import LostPetsFeed from "./pages/LostPetsFeed";

const ProtectedRoute = ({ element, requiredRole, ngoOnly = false }) => {
  const user = useStore((state) => state.user);
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const ngo = useStore((state) => state.ngo);
  const isNgoAuthenticated = useStore((state) => state.isNgoAuthenticated);
  const isLoading = useStore((state) => state.isLoading);
  const getDefaultRoute = useStore((state) => state.getDefaultRoute);

  if (isLoading) return <div>Loading...</div>;

  if (ngoOnly) {
    if (!isNgoAuthenticated || !ngo) {
      return <Navigate to="/ngo/login" replace />;
    }

    return element;
  }

  if (isNgoAuthenticated) {
    return <Navigate to={getDefaultRoute()} replace />;
  }

  if (!isAuthenticated || !user) return <Navigate to="/login" replace />;

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={getDefaultRoute()} replace />;
  }

  return element;
};

const NotFound = () => (
  <h1 className="text-4xl text-red-500 p-8 text-center">404 - Not Found</h1>
);

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="p-0 m-0">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/donations" element={<DonationFeed />} />
          <Route path="/ngo/register" element={<RegisterNgo />} />
          <Route path="/ngo/login" element={<LoginNgo />} />
          <Route path="/ngo/:id" element={<NgoProfile />} />
          <Route path="/lost-pets/report" element={<ReportLostPet />} />
          <Route path="/lost-pets" element={<LostPetsFeed />} />
          <Route path="*" element={<NotFound />} />

          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
          <Route
            path="/rescue/report"
            element={
              <ProtectedRoute requiredRole="donor" element={<ReportRescue />} />
            }
          />
          <Route
            path="/rescue/nearby"
            element={
              <ProtectedRoute
                requiredRole="volunteer"
                element={<NearbyCases />}
              />
            }
          />
          <Route
            path="/donations/new"
            element={
              <ProtectedRoute
                requiredRole="donor"
                element={<CreateDonation />}
              />
            }
          />
          <Route
            path="/volunteer/cases"
            element={
              <ProtectedRoute
                requiredRole="volunteer"
                element={<VolunteerDashboard />}
              />
            }
          />
          <Route
            path="/rescue/my-assigned"
            element={
              <ProtectedRoute
                requiredRole="volunteer"
                element={<MyAssignedRescues />}
              />
            }
          />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<Profile />} />}
          />
          <Route
            path="/rescue/my-reports"
            element={
              <ProtectedRoute requiredRole="donor" element={<MyRescues />} />
            }
          />
          <Route
            path="/ngo/dashboard"
            element={<ProtectedRoute ngoOnly element={<NgoDashboard />} />}
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
