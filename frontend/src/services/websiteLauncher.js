// frontend/services/websiteLauncher.js

/**
 * Normalize all types of URLs or schemes (http, mailto, tel, ftp, custom)
 */
const normalizeUrl = (input) => {
  const trimmed = input.trim();
  const hasScheme = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed);
  return hasScheme ? trimmed : "https://" + trimmed;
};

/**
 * Launch websites directly from frontend
 */
export const launchWebsites = (websites = []) => {
  try {
    websites.forEach((raw) => {
      const url = normalizeUrl(raw);
      window.open(url, "_blank"); // opens in new tab
      console.log(`🌐 Opened website: ${url}`);
    });

    console.log("🚀 All websites launched successfully");
  } catch (error) {
    console.error("🚨 Website launcher failed:", error.message);
  }
};
