import axios from "axios";

export const saveTimetable = async (timetable) => {
  const res = await axios.post("http://localhost:5000/timetable/save", timetable);
  return res.data;
};
