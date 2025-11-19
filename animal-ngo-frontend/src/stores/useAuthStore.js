import { create } from "zustand";
import {
  login as loginService,
  register as registerService,
  logout as logoutService,
} from "../api/authService";

export const useAuth = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const data = await loginService(email, password);
      set({
        user: data.user,
        token: data.token,
        isLoading: false,
      });
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
    } catch (err) {
      set({ isLoading: false });
      throw err.response?.data?.message || "Login failed";
    }
  },

  register: async (userData) => {
    set({ isLoading: true });
    try {
      const data = await registerService(userData);
      set({
        user: data.user,
        token: data.token,
        isLoading: false,
      });
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
    } catch (err) {
      set({ isLoading: false });
      throw err.response?.data?.message || "Registration failed";
    }
  },

  logout: () => {
    logoutService();
    set({ user: null, token: null });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
}));
