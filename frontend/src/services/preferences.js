import axios from "axios";

const API_URL = "http://localhost:8000/teacher-preferences";

export const getPreferences = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createPreference = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updatePreference = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deletePreference = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
