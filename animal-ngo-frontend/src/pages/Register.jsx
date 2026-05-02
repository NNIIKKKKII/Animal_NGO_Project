import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import useStore from "../stores/store.js";
import VideoBackground from "../components/VideoBackground";

const Register = () => {
  const navigate = useNavigate();
  const registerUser = useStore((state) => state.register);
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const getDefaultRoute = useStore((state) => state.getDefaultRoute);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "donor",
    phone_number: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  if (isAuthenticated) {
    return <Navigate to={getDefaultRoute()} replace />;
  }

  const submitRegistration = async (extraData = {}) => {
    try {
      await registerUser({
        ...formData,
        ...extraData,
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!navigator.geolocation) {
      await submitRegistration();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        await submitRegistration({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      async () => {
        await submitRegistration();
      }
    );
  };

  return (
    <VideoBackground>
      <div className="w-full max-w-lg p-4">
        <div className="app-card p-8 md:p-10">
          <p className="app-label text-center">Join The Network</p>
          <h2 className="app-title mt-3 text-center text-4xl">Create Account</h2>
          <p className="app-subtitle mt-3 text-center">
            Build your rescue profile as a donor or volunteer.
          </p>

          {error && <div className="app-alert app-alert-error mt-6">{error}</div>}

          <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4">
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required className="app-input" />
            <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email Address" required className="app-input" />
            <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Password" required className="app-input" />
            <input name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="Phone Number" required className="app-input" />
            <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" required className="app-input" />

            <select name="role" value={formData.role} onChange={handleChange} className="app-select">
              <option value="donor">Donor</option>
              <option value="volunteer">Volunteer</option>
            </select>

            <button disabled={loading} className="app-btn app-btn-primary mt-2 w-full">
              {loading ? "Creating..." : "Register"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#6b5752]">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-[#b83d55] hover:text-[#a8364d]">
              Login
            </Link>
          </p>
        </div>
      </div>
    </VideoBackground>
  );
};

export default Register;
