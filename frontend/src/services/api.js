import axios from "axios";

const API = axios.create({
  baseURL: "https://grazyna-hypethral-holoblastically.ngrok-free.dev",
});

export const analyzeCode = async (data) => {
  const response = await API.post("/analyze", data);
  return response.data;
};