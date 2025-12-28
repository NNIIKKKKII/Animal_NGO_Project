import axios from "axios";

const API_URL = "http://localhost:5000/api/lost-pets";

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const reportLostPet = async (data) => {
  const res = await axios.post(API_URL, data, getConfig());
  return res.data;
};

export const getLostPets = async () => {
  const res = await axios.get(API_URL);
  return res.data.data;
};
