import { Link, useLocation, useNavigate } from "react-router-dom";
import useStore from "../stores/store.js";
import { useState } from "react";

const Navbar = () => {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const isNgoAuthenticated = useStore((state) => state.isNgoAuthenticated);
  const logoutActiveSession = useStore((state) => state.logoutActiveSession);
  const user = useStore((state) => state.user);
  const ngo = useStore((state) => state.ngo);

  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const activeSession = isNgoAuthenticated ? "ngo" : isAuthenticated ? "user" : null;
  const isLandingPage = location.pathname === "/" && !activeSession;

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/ngo/login" ||
    location.pathname === "/ngo/register";

  const navLink = isLandingPage
    ? "text-[#5c4846] hover:text-[#bf4860] transition-all duration-300"
    : "text-purple-900 hover:text-blue-900 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105";

  const handleLogout = (isMobile = false) => {
    const redirectPath = activeSession === "ngo" ? "/ngo/login" : "/login";

    logoutActiveSession();
    if (isMobile) setMenuOpen(false);
    navigate(redirectPath, { replace: true });
  };

  const renderSessionLinks = (isMobile = false) => {
    if (activeSession === "ngo") {
      return (
        <>
          <Link
            to="/ngo/dashboard"
            onClick={isMobile ? () => setMenuOpen(false) : undefined}
            className={navLink}
          >
            {ngo?.name || "NGO Dashboard"}
          </Link>

          <button
            onClick={() => handleLogout(isMobile)}
            className={`text-red-500 hover:text-red-900 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105${isMobile ? " text-left" : ""}`}
          >
            Logout
          </button>
        </>
      );
    }

    if (activeSession === "user") {
      return (
        <>
          <Link
            to="/profile"
            onClick={isMobile ? () => setMenuOpen(false) : undefined}
            className={navLink}
          >
            Profile
          </Link>

          {user?.role === "donor" && (
            <Link
              to="/rescue/my-reports"
              onClick={isMobile ? () => setMenuOpen(false) : undefined}
              className={navLink}
            >
              My Reports
            </Link>
          )}

          {user?.role === "volunteer" && (
            <Link
              to="/volunteer/cases"
              onClick={isMobile ? () => setMenuOpen(false) : undefined}
              className={navLink}
            >
              My Assignments
            </Link>
          )}

          <Link
            to="/lost-pets/report"
            onClick={isMobile ? () => setMenuOpen(false) : undefined}
            className={navLink}
          >
            Report Lost Pet
          </Link>

          <Link
            to="/lost-pets"
            onClick={isMobile ? () => setMenuOpen(false) : undefined}
            className={navLink}
          >
            Lost Pets
          </Link>

          <button
            onClick={() => handleLogout(isMobile)}
            className={`text-red-500 hover:text-red-900 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105${isMobile ? " text-left" : ""}`}
          >
            Logout
          </button>
        </>
      );
    }

    if (isAuthPage) return null;

    return (
      <>
        <Link
          to="/ngo/register"
          onClick={isMobile ? () => setMenuOpen(false) : undefined}
          className={navLink}
        >
          NGO Register
        </Link>

        <Link
          to="/ngo/login"
          onClick={isMobile ? () => setMenuOpen(false) : undefined}
          className={navLink}
        >
          NGO Login
        </Link>

        <Link
          to="/register"
          onClick={isMobile ? () => setMenuOpen(false) : undefined}
          className={navLink}
        >
          Register
        </Link>

        <Link
          to="/login"
          onClick={isMobile ? () => setMenuOpen(false) : undefined}
          className={navLink}
        >
          Login
        </Link>
      </>
    );
  };

  return (
    <header
      className={
        isLandingPage
          ? "sticky top-0 z-40 border-b border-[#f1d8d5] bg-[#fff8f6]/85 backdrop-blur-xl shadow-[0_10px_30px_rgba(145,103,103,0.06)]"
          : "bg-gradient-to-r from-pink-400/90 via-purple-400/90 to-blue-400/90 backdrop-blur-md shadow-lg border-b border-white/20"
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <>
            <style>
              {`
@keyframes logoPulse {
  0%,100% { transform: scale(1); }
  50% { transform: scale(1.15); }
}

@keyframes logoColor {
  0% { color: #3b82f6; }
  33% { color: #8b5cf6; }
  66% { color: #ec4899; }
  100% { color: #3b82f6; }
}

.logo-animation {
  animation: logoPulse 4.5s ease-in-out infinite,
             logoColor 6s linear infinite;
}
`}
            </style>

            <Link
              to={activeSession === "ngo" ? "/ngo/dashboard" : activeSession === "user" ? "/dashboard" : "/"}
              className={isLandingPage
                ? "text-2xl font-bold tracking-[0.04em] text-[#221c1a]"
                : "text-2xl font-bold tracking-wide logo-animation drop-shadow-lg"}
            >
              Animal NGO
            </Link>
          </>

          <nav className="hidden md:flex items-center space-x-6 text-base font-semibold">
            <Link to="/donations" className={navLink}>
              Donation Feed
            </Link>

            <Link to="/lost-pets" className={navLink}>
              Lost Pets
            </Link>

            {renderSessionLinks(false)}
          </nav>

          <button
            className={isLandingPage
              ? "md:hidden text-[#221c1a] text-base font-semibold hover:text-[#bf4860] transition"
              : "md:hidden text-white text-2xl hover:scale-110 transition"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            Menu
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className={isLandingPage
          ? "md:hidden border-t border-[#f1d8d5] backdrop-blur-xl bg-[#fff8f6]/95"
          : "md:hidden border-t border-white/20 backdrop-blur-md bg-white/20"}>
          <div className={isLandingPage
            ? "flex flex-col space-y-4 px-4 py-4 text-base font-medium text-[#5c4846]"
            : "flex flex-col space-y-4 px-4 py-4 text-base font-medium text-white"}>
            <Link
              to="/donations"
              onClick={() => setMenuOpen(false)}
              className={navLink}
            >
              Donation Feed
            </Link>

            <Link
              to="/lost-pets"
              onClick={() => setMenuOpen(false)}
              className={navLink}
            >
              Lost Pets
            </Link>

            {renderSessionLinks(true)}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
