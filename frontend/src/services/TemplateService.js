// services/TemplateService.js
import api from "./api";
import {
  getGuestTemplates,
  addGuestTemplate,
  saveGuestTemplates,
  deleteGuestTemplate,
} from "../utils/guestTemplates";

// ✅ Get all templates
export const getAllTemplates = async (user) => {
  if (user) {
    const res = await api.get("/templates");
    return res.data;
  } else {
    return getGuestTemplates();
  }
};

// ✅ Get top N templates (sorted by usageCount)
export const getTopTemplates = async (user, limit = 3) => {
  const all = await getAllTemplates(user);
  return all.sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0)).slice(0, limit);
};

// ✅ Create template
export const createTemplate = async (data, user) => {
  if (user) {
    const res = await api.post("/templates", data);
    return res.data;
  } else {
    const guestTemplate = { ...data, _id: crypto.randomUUID(), usageCount: 0, createdAt: new Date().toISOString() };
    addGuestTemplate(guestTemplate);
    return guestTemplate;
  }
};

// ✅ Get template by ID
export const getTemplateById = async (id, user) => {
  if (user) {
    const res = await api.get(`/templates/${id}`);
    return res.data;
  } else {
    const all = getGuestTemplates();
    return all.find((t) => t._id === id);
  }
};

// ✅ Update template
export const updateTemplate = async (id, data, user) => {
  if (user) {
    const res = await api.put(`/templates/${id}`, data);
    return res.data;
  } else {
    const all = getGuestTemplates();
    const updated = all.map((t) => (t._id === id ? { ...t, ...data } : t));
    saveGuestTemplates(updated);
    return updated.find((t) => t._id === id);
  }
};

// ✅ Delete template
export const deleteTemplate = async (id, user) => {
  if (user) {
    const res = await api.delete(`/templates/${id}`);
    return res.data;
  } else {
    deleteGuestTemplate(id);
    return { message: "Deleted locally" };
  }
};

// ✅ Increment usage count
export const incrementTemplateUsage = async (id, user) => {
  if (user) {
    const res = await api.post(`/templates/${id}/use`);
    return res.data;
  } else {
    const all = getGuestTemplates();
    const updated = all.map((t) =>
      t._id === id ? { ...t, usageCount: (t.usageCount || 0) + 1 } : t
    );
    saveGuestTemplates(updated);
    return updated.find((t) => t._id === id);
  }
};
