// animal-ngo-frontend/src/api/userService.js
import api from "./apiClient";

/**
 * Fetch the currently logged-in user's profile
 * GET /api/users/:id
 */
export const getMyProfile = async (userId) => {
  const res = await api.get(`/api/users/${userId}`);
  return res.data.data || res.data.user;
};

/**
 * Update user profile details
 * PUT /api/users/:id
 */
export const updateMyProfile = async (userId, profileData) => {
  const res = await api.put(`/api/users/${userId}`, profileData);
  return res.data.user;
};

/**
 * Update user's live location
 * PUT /api/users/location
 */
export const updateMyLocation = async (latitude, longitude) => {
  const res = await api.put("/api/users/location", {
    latitude,
    longitude,
  });
  return res.data;
};
