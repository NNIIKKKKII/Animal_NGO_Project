import { useState } from "react";
import { register } from "../api/authService";
import { useNavigate, Link } from "react-router-dom";
import VideoBackground from "../components/VideoBackground";

const Register = () => {
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!navigator.geolocation) {
      setError("Geolocation not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          await register({
            ...formData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });

          navigate("/login");
        } catch (err) {
          console.error(err);
          setError(
            err?.response?.data?.message ||
            "Registration failed. Please try again."
          );
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location permission is required to register");
        setLoading(false);
      }
    );
  };

  return (
    <VideoBackground>

      <div className="flex items-center justify-center min-h-screen px-4">

        <div className="w-full max-w-md backdrop-blur-xl bg-white/40 border border-white/40 shadow-2xl rounded-2xl p-10">

          <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">
            Create Account 🐾
          </h2>

          <p className="text-center text-gray-600 mb-8">
            Join the community helping animals
          </p>

          {error && (
            <div className="mb-4 bg-red-100/90 text-red-700 p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full rounded-xl border border-gray-300 bg-white/80 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Email Address"
              required
              className="w-full rounded-xl border border-gray-300 bg-white/80 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />

            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              required
              className="w-full rounded-xl border border-gray-300 bg-white/80 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />

            <input
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="w-full rounded-xl border border-gray-300 bg-white/80 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />

            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              required
              className="w-full rounded-xl border border-gray-300 bg-white/80 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 bg-white/80 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            >
              <option value="donor">Donor</option>
              <option value="volunteer">Volunteer</option>
            </select>

            <button
              disabled={loading}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition disabled:opacity-60"
            >
              {loading ? "Creating..." : "Register"}
            </button>

          </form>

          <p className="text-sm text-center mt-6 text-gray-700">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-600 hover:text-green-800 font-semibold transition"
            >
              Login
            </Link>
          </p>

        </div>

      </div>

    </VideoBackground>
  );
};

export default Register;