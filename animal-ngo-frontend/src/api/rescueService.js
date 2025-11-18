import axios from "axios";

const API_URL = "http://localhost:5000/api/rescue";

const getConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const createRescueCase = async (caseData) => {
  const config = getConfig();
  const response = await axios.post(API_URL, caseData, config());
  return response.data;
};

export const getNearbyCases = async (latitude, longitude, radius = 5000) => {
  const config = getConfig();
  const response = await axios.post(
    `${API_URL}/nearby`,
    { latitude, longitude, radius },
    config
  );
  return response.data.data;
};

export const assignVolunteerToCase = async (caseId) => {
  const config = getConfig();
  // Your backend route: PUT /api/rescue/:id/assign
  const response = await axios.put(`${API_URL}/${caseId}/assign`, {}, config);
  return response.data;
};

export const updateCaseStatus = async (caseId, status) => {
  const config = getConfig();
  // Your backend route: PUT /api/rescue/:id/status
  const response = await axios.put(
    `${API_URL}/${caseId}/status`,
    { status },
    config
  );
  return response.data;
};

export const getAllCases = async () => {
  const config = getConfig();
  const response = await axios.get(API_URL, config);
  return response.data;
};
