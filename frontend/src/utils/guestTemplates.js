import { launchGuestTemplateAPI } from "../services/guestApi";

const normalizeUrl = (url = "") => {
  const trimmed = url.trim();
  const hasScheme = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed);
  return hasScheme ? trimmed : `https://${trimmed}`;
};

export async function doLaunch(template = {}) {
  const { websites = [] } = template;

  try {
    const result = await launchGuestTemplateAPI(template);
    console.log("✅ Guest template launch result:", result);
  } catch (err) {
    console.error("🚨 Failed to launch guest template via API:", err.message);
  }

  websites.forEach((site) => {
    if (site && site.trim()) {
      const safeUrl = normalizeUrl(site);
      window.open(safeUrl, "_blank", "noopener,noreferrer");
    }
  });
}
