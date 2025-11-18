// animal-ngo-frontend/src/api/authService.js
import axios from "axios";

// Base URL for the User API endpoints (Backend runs on port 3001)
const API_URL = "http://localhost:5000/api/users";

/**
 * Registers a new user with all required data, including location.
 */
export const register = async (userData) => {
  // userData is the object from the form state
  const response = await axios.post(`${API_URL}/register`, userData);

  // Axios puts the server response in the 'data' property
  return response.data;
};

/**
 * Logs a user in.
 */
export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

// Placeholder for other auth actions
export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
