import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

// Attach JWT token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const loginUser = (data) => API.post("/auth/login", data);
export const signupUser = (data) => API.post("/auth/signup", data);
export const getMe = () => API.get("/auth/me");

// Dashboard API calls
export const getTeachers = () => API.get("/teachers/");
export const getClasses = () => API.get("/classes/");
export const getSubjects = () => API.get("/subjects/");
export const getRooms = () => API.get("/rooms/");

export default API;
