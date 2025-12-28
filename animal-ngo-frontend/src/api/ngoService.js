import axios from "axios";

const API_URL = "http://localhost:5000/api/ngos";

export const registerNgo = async (data) => {
  const res = await axios.post(`${API_URL}/register`, data);
  return res.data;
};

export const loginNgo = async (data) => {
    const res = await axios.post(`${API_URL}/login`, data);
    return res.data;
  };
  
  export const getNgoProfile = async (id) => {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data.ngo;
  };
  