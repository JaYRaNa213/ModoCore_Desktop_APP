// ✅ src/services/automationService.js
import axios from "axios";

const API = "/api/automations";

export const fetchAutomations = () => axios.get(API);
export const createAutomation = (data) => axios.post(API, data);
export const updateAutomation = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteAutomation = (id) => axios.delete(`${API}/${id}`);

export const fetchLogs = () => axios.get("/api/automation-logs");