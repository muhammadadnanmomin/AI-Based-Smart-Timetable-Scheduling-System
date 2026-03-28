import axios from "axios";

const API_URL = "http://localhost:8000/classes";

export const getClasses = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createClass = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updateClass = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteClass = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
