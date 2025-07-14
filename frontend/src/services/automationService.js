// src/services/automationService.js
import axios from "axios";

const API_BASE = "/api/automations";
const LOGS_API = "/api/automation-logs";

// 🧩 Automations
export const getUserAutomations = async () => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const createAutomation = async (data) => {
  const res = await axios.post(API_BASE, data);
  return res.data;
};

export const updateAutomation = async (id, updates) => {
  const res = await axios.put(`${API_BASE}/${id}`, updates);
  return res.data;
};

export const deleteAutomation = async (id) => {
  const res = await axios.delete(`${API_BASE}/${id}`);
  return res.data;
};

export const toggleAutomationStatus = async (id, isActive) => {
  const res = await axios.patch(`${API_BASE}/${id}/status`, { isActive });
  return res.data;
};

// 🧾 Logs
export const fetchAutomationLogs = async () => {
  const res = await axios.get(LOGS_API);
  return res.data;
};

// 📦 Admin
export const adminCreateAutomation = async (data) => {
  const res = await axios.post("/api/admin/automations", data);
  return res.data;
};


// services/automationService.js
export const getAutomationLogs = async (automationId) => {
  const res = await fetch(`/api/automations/${automationId}/logs`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch logs");
  return await res.json();
};
