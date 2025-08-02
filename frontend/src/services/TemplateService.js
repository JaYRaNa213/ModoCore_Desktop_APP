// services/TemplateService.js
import api from "./api";

export const createTemplate = async (data) => {
  const res = await api.post("/templates", data);
  return res.data;
};

export const getAllTemplates = async () => {
  const res = await api.get("/templates");
  return res.data;
};

export const getTemplateById = async (id) => {
  const res = await api.get(`/templates/${id}`);
  return res.data;
};

export const incrementTemplateUsage = async (id) => {
  const res = await api.post(`/templates/${id}/use`);
  return res.data;
};

export const getTopTemplates = async (limit = 3) => {
  const res = await api.get(`/templates?limit=${limit}`);
  return res.data.slice(0, limit);
};

export const deleteTemplate = async (id) => {
  const res = await api.delete(`/templates/${id}`);
  return res.data;
};

export const updateTemplate = async (id, data) => {
  const res = await api.put(`/templates/${id}`, data);
  return res.data;
};
