import axios from "axios";

const API_URL = "http://localhost:8000/subjects/";

export const getSubjects = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createSubject = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updateSubject = async (id, data) => {
  const res = await axios.put(`${API_URL}${id}`, data);
  return res.data;
};

export const deleteSubject = async (id) => {
  const res = await axios.delete(`${API_URL}${id}`);
  return res.data;
};
