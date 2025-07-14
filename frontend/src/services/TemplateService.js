// ✅ src/services/TemplateService.js
import axios from "axios";

const API = "/api/templates";

export const createTemplate = async (data) => {
  const res = await axios.post(API, data);
  return res.data;
};

export const getAllTemplates = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const getTemplateById = async (id) => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
};

export const incrementTemplateUsage = async (id) => {
  const res = await axios.post(`${API}/${id}/use`);
  return res.data;
};

export const getTopTemplates = async (limit = 3) => {
  const res = await axios.get(`${API}?limit=${limit}`);
  return res.data.slice(0, limit);
};