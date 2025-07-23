import axios from "axios";

// Detect environment
const isDev = process.env.NODE_ENV === "development";

// Define backend URL based on environment
const BASE_URL = isDev
  ? "http://localhost:5000/api/templates" // Your dev API
  : "http://localhost:5000/api/templates"; // Adjust this for production API if needed

export const createTemplate = async (data) => {
  const res = await axios.post(BASE_URL, data);
  return res.data;
};

export const getAllTemplates = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const getTemplateById = async (id) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};

export const incrementTemplateUsage = async (id) => {
  const res = await axios.post(`${BASE_URL}/${id}/use`);
  return res.data;
};

export const getTopTemplates = async (limit = 3) => {
  const res = await axios.get(`${BASE_URL}?limit=${limit}`);
  return res.data.slice(0, limit);
};


export const deleteTemplate = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};



export const updateTemplate = async (id, data) => {
  const res = await axios.put(`${BASE_URL}/${id}`, data);
  return res.data;
};
