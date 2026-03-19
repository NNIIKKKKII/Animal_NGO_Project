import { Link, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import useStore from "../stores/store.js"

import { useState } from "react";

const Navbar = () => {
  // const { isAuthenticated, logout } = useAuth();
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const logout = useStore((state) => state.logout)


  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/ngo/login" ||
    location.pathname === "/ngo/register";

  const navLink =
    "text-purple-900 hover:text-blue-900 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105";

  return (
    <header className="bg-gradient-to-r from-pink-400/90 via-purple-400/90 to-blue-400/90 backdrop-blur-md shadow-lg border-b border-white/20">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16">

          {/* Logo */}
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
              to="/"
              className="text-2xl font-bold tracking-wide logo-animation drop-shadow-lg"
            >
              🐾 Animal NGO
            </Link>
          </>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-base font-semibold">

            <Link to="/donations" className={navLink}>
              Donation Feed
            </Link>

            {!isAuthPage && (
              <>
                <Link to="/ngo/register" className={navLink}>
                  NGO Register
                </Link>

                <Link to="/ngo/login" className={navLink}>
                  NGO Login
                </Link>
              </>
            )}

            {isAuthenticated ? (
              <>
                <Link to="/profile" className={navLink}>
                  Profile
                </Link>

                <Link to="/lost-pets/report" className={navLink}>
                  Report Lost Pet
                </Link>

                <Link to="/lost-pets" className={navLink}>
                  Lost Pets
                </Link>

                <button
                  onClick={logout}
                  className="text-red-500 hover:text-red-900 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                >
                  Logout
                </button>
              </>
            ) : (
              !isAuthPage && (
                <>
                  <Link to="/register" className={navLink}>
                    Register
                  </Link>

                  <Link to="/login" className={navLink}>
                    Login
                  </Link>
                </>
              )
            )}

          </nav>

          {/* Burger Icon */}
          <button
            className="md:hidden text-white text-2xl hover:scale-110 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/20 backdrop-blur-md bg-white/20">

          <div className="flex flex-col space-y-4 px-4 py-4 text-base font-medium text-white">

            <Link
              to="/donations"
              onClick={() => setMenuOpen(false)}
              className={navLink}
            >
              Donation Feed
            </Link>

            {!isAuthPage && (
              <>
                <Link
                  to="/ngo/register"
                  onClick={() => setMenuOpen(false)}
                  className={navLink}
                >
                  NGO Register
                </Link>

                <Link
                  to="/ngo/login"
                  onClick={() => setMenuOpen(false)}
                  className={navLink}
                >
                  NGO Login
                </Link>
              </>
            )}

            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className={navLink}
                >
                  Profile
                </Link>

                <Link
                  to="/lost-pets/report"
                  onClick={() => setMenuOpen(false)}
                  className={navLink}
                >
                  Report Lost Pet
                </Link>

                <Link
                  to="/lost-pets"
                  onClick={() => setMenuOpen(false)}
                  className={navLink}
                >
                  Lost Pets
                </Link>

                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="text-red-500 hover:text-red-900 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              !isAuthPage && (
                <>
                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className={navLink}
                  >
                    Register
                  </Link>

                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className={navLink}
                  >
                    Login
                  </Link>
                </>
              )
            )}

          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;