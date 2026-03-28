import axios from "axios";

const API_URL = "http://localhost:8000/days";

export const getDays = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createDay = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updateDay = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteDay = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
