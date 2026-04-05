import axios from "axios";

const API_URL = "http://localhost:5000/time-slots";

export const getTimeSlots = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createTimeSlot = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updateTimeSlot = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteTimeSlot = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
