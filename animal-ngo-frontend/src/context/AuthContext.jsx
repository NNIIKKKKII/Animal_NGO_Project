import React, { createContext, useContext, useState, useEffect } from "react";
import {
  login as loginService,
  register as registerService,
  logout as logoutService,
} from "../api/authService";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && token) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [user, token]);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const data = await loginService(email, password);
      setUser(data.user);
      setToken(data.token);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      throw error.response?.data?.message || "Login failed";
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      const data = await registerService(userData);
      setUser(data.user);
      setToken(data.token);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      throw error.response?.data?.message || "Registration failed";
    }
  };

  const logout = () => {
    logoutService();
    setUser(null);
    setToken(null);
    navigate("/login");
  };

  // ⭐ ADD THIS FUNCTION ⭐
  const updateUserContext = (updatedUser) => {
    setUser(updatedUser);
  };

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUserContext, // ⭐ ADD IT HERE TOO ⭐
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
