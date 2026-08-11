import axios from "axios";

const API = axios.create({
  baseURL: "https://codepilot-ai-3-5t3h.onrender.com",
});

export const analyzeCode = async (data) => {
  const response = await API.post("/analyze", data);
  return response.data;
};

export const getHistory = async () => {
  const response = await API.get("/history");
  return response.data;
};