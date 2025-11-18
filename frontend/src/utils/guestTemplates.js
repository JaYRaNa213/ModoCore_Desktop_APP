import { launchGuestTemplateAPI } from "../services/guestApi";

const normalizeUrl = (url = "") => {
  const trimmed = url.trim();
  if (!trimmed) return null;
  const hasScheme = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed);
  return hasScheme ? trimmed : `https://${trimmed}`;
};

const getElectronAPI = () => {
  if (typeof window === "undefined") return null;
  return window.electronAPI || null;
};

export async function doLaunch(template = {}) {
  const { websites = [], apps = [] } = template;
  const electronAPI = getElectronAPI();
  const sanitizedWebsites = websites
    .map((site) => (typeof site === "string" ? normalizeUrl(site) : null))
    .filter(Boolean);

  if (apps?.length) {
    if (electronAPI?.launchApps) {
      try {
        const result = await electronAPI.launchApps(apps);
        console.log("✅ Electron app launch result:", result);
      } catch (err) {
        console.error("🚨 Electron app launch failed:", err.message);
      }
    } else {
      try {
        const result = await launchGuestTemplateAPI({ apps });
        console.log("✅ Guest template launch result:", result);
      } catch (err) {
        console.error("🚨 Failed to launch guest template via API:", err.message);
      }
    }
  }

  if (!sanitizedWebsites.length) return;

  if (electronAPI?.createTab) {
    sanitizedWebsites.forEach((url) => electronAPI.createTab(url));
  } else if (typeof window !== "undefined") {
    sanitizedWebsites.forEach((safeUrl) => {
      window.open(safeUrl, "_blank", "noopener,noreferrer");
    });
  }
}
