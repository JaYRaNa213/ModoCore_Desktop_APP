import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const launchGuestTemplateAPI = async (template) => {
  const res = await axios.post(`${API_BASE}/api/guest/launch`, template);
  return res.data;
};
