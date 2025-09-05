import { launchGuestTemplateAPI } from "../services/guestApi";

const GUEST_KEY = "guest-templates";

export const getGuestTemplates = () => {
  const raw = localStorage.getItem(GUEST_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const saveGuestTemplates = (templates) => {
  localStorage.setItem(GUEST_KEY, JSON.stringify(templates));
};

export const addGuestTemplate = (template) => {
  const all = getGuestTemplates();
  template._id = template._id || Date.now().toString(); // Assign unique ID if not present
  template.createdAt = new Date().toISOString();
  saveGuestTemplates([...all, template]);
};

export const purgeOldGuestTemplates = () => {
  const now = Date.now();
  const valid = getGuestTemplates().filter(
    (t) => now - new Date(t.createdAt).getTime() < 3 * 24 * 60 * 60 * 1000
  );
  saveGuestTemplates(valid);
  return valid;
};

export const getGuestTemplateById = (id) => {
  return getGuestTemplates().find((t) => t._id === id);
};

// 🔹 Normalize website URL
const normalizeUrl = (url) => {
  const trimmed = url.trim();
  const hasScheme = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed);
  return hasScheme ? trimmed : "https://" + trimmed;
};

export async function doLaunch(template) {
  const { apps = [], websites = [] } = template;

  try {
    // Send to backend API
    const result = await launchGuestTemplateAPI({
      ...template,
      apps,
      websites,
    });

    console.log("✅ Guest template launch result:", result);
  } catch (err) {
    console.error("🚨 Failed to launch guest template via API:", err.message);
  }

  // Fallback → still open websites in browser
  websites.forEach((site) => {
    if (site?.trim()) {
      const safeUrl = normalizeUrl(site);
      console.log("Opening website:", safeUrl);
      window.open(safeUrl, "_blank", "noopener,noreferrer");
    }
  });
}

export const deleteGuestTemplate = (id) => {
  const templates = getGuestTemplates();
  const updated = templates.filter((t) => t._id !== id);
  saveGuestTemplates(updated);
};
