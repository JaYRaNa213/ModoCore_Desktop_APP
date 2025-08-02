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
  template.createdAt = new Date().toISOString();
  saveGuestTemplates([...all, template]);
};

export const purgeOldGuestTemplates = () => {
  const now = Date.now();
  const valid = getGuestTemplates().filter(t =>
    now - new Date(t.createdAt).getTime() < 3 * 24 * 60 * 60 * 1000
  );
  saveGuestTemplates(valid);
  return valid;
};




const normalizeUrl = (url) => {
  const trimmed = url.trim();

  // Match valid URI scheme like http:, mailto:, tel:, ftp:, spotify:
  const hasScheme = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed);
  if (hasScheme) return trimmed;

  // Default to https if no scheme
  return "https://" + trimmed;
};


export function doLaunch(template) {
  const { apps = [], websites = [] } = template;

  // Apps logic for guest: just simulate (no real launching)
  apps.forEach(app => {
    if (app?.trim()) {
      console.log("Launching app (simulated for guest):", app);
      // You can enhance this with Electron shell launch later
    }
  });

  // Open websites with proper URL normalization
  websites.forEach(site => {
    if (site?.trim()) {
      const safeUrl = normalizeUrl(site);
      console.log("Opening website:", safeUrl);
      window.open(safeUrl, "_blank", "noopener,noreferrer");
    }
  });
}

