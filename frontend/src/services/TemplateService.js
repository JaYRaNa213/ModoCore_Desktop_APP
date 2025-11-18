// src/services/TemplateService.js
import api from "./api";

const resolveGuestContext = () => {
  if (typeof window === "undefined") {
    return { guestId: null, guestName: "Guest User" };
  }

  let guestId = localStorage.getItem("guestId");
  if (!guestId) {
    guestId =
      window.crypto?.randomUUID?.() ||
      `guest-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    localStorage.setItem("guestId", guestId);
  }

  const guestName = localStorage.getItem("guestName") || "Guest User";
  return { guestId, guestName };
};

const buildGuestConfig = (initialConfig = {}) => {
  const { guestId, guestName } = resolveGuestContext();
  return {
    ...initialConfig,
    headers: {
      "X-Guest-Id": guestId,
      "X-Guest-Name": guestName,
      ...(initialConfig.headers || {}),
    },
  };
};

// ✅ Get all templates
export const getAllTemplates = async (user) => {
  if (user) {
    const res = await api.get("/templates");
    return res.data;
  } else {
    const { guestId } = resolveGuestContext();
    if (!guestId) return [];
    const res = await api.get(
      "/templates",
      buildGuestConfig({ params: { guestId } })
    );
    return res.data;
  }
};

// ✅ Get top N templates (sorted by usageCount)
export const getTopTemplates = async (user, limit = 3) => {
  const all = await getAllTemplates(user);
  return all
    .sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0))
    .slice(0, limit);
};

// ✅ Create template
export const createTemplate = async (data, user) => {
  if (user) {
    const res = await api.post("/templates", data);
    return res.data;
  } else {
    const { guestId, guestName } = resolveGuestContext();
    const payload = {
      ...data,
      guestId,
      guestName,
      userType: "guest",
    };
    const res = await api.post("/templates", payload, buildGuestConfig());
    return res.data;
  }
};

// ✅ Get template by ID
export const getTemplateById = async (id, user) => {
  if (user) {
    const res = await api.get(`/templates/${id}`);
    return res.data;
  } else {
    const { guestId } = resolveGuestContext();
    const res = await api.get(
      `/templates/${id}`,
      buildGuestConfig({ params: { guestId } })
    );
    return res.data;
  }
};

// ✅ Update template
export const updateTemplate = async (id, data, user) => {
  if (user) {
    const res = await api.put(`/templates/${id}`, data);
    return res.data;
  } else {
    const { guestId, guestName } = resolveGuestContext();
    const payload = { ...data, guestId, guestName };
    const res = await api.put(`/templates/${id}`, payload, buildGuestConfig());
    return res.data;
  }
};

// ✅ Delete template
export const deleteTemplate = async (id, user) => {
  if (user) {
    const res = await api.delete(`/templates/${id}`);
    return res.data;
  } else {
    const { guestId } = resolveGuestContext();
    const res = await api.delete(`/templates/${id}`, {
      ...buildGuestConfig(),
      data: { guestId },
    });
    return res.data;
  }
};

// ✅ Increment usage count
export const incrementTemplateUsage = async (id, user) => {
  if (user) {
    const res = await api.post(`/templates/${id}/use`);
    return res.data;
  } else {
    const { guestId } = resolveGuestContext();
    const res = await api.post(
      `/templates/${id}/use`,
      { guestId },
      buildGuestConfig()
    );
    return res.data;
  }
};