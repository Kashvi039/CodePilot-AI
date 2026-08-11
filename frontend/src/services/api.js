import axios from "axios";

const API = axios.create({
  baseURL: "https://codepilot-ai-3-5t3h.onrender.com",
  timeout: 60000,
});

export const analyzeCode = async (data) => {
  const response = await API.post("/analyze", data);
  return response.data;
};

export const getHistory = async () => {
  console.log("Calling history API...");

  const response = await API.get("/history");

  console.log("History API response:", response.data);

  return response.data;
};