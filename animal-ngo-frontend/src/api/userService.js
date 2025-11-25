// animal-ngo-frontend/src/api/userService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

const getConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

/**
 * Fetches the currently logged-in user's profile data.
 */
export const getMyProfile = async (userId) => {
  const config = getConfig();
  // Your backend route: GET /api/users/:id
  const response = await axios.get(`${API_URL}/${userId}`, config);
  // Note: The structure of the response depends on the controller's implementation
  return response.data.data || response.data.user;
};

/**
 * Updates the user's profile details.
 */
export const updateMyProfile = async (userId, profileData) => {
  const config = getConfig();
  // Your backend route: PUT /api/users/:id
  const response = await axios.put(`${API_URL}/${userId}`, profileData, config);
  return response.data.user;
};
