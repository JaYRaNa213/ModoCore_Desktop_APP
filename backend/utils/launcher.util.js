import open from "open";
import { existsSync } from "fs";
import path from "path";

/**
 * Normalize website URL (adds https:// if missing)
 */
const normalizeUrl = (url) => {
  let clean = url.trim().toLowerCase();
  if (!clean.startsWith("http://") && !clean.startsWith("https://")) {
    clean = "https://" + clean;
  }
  return clean;
};

/**
 * Normalize app entry:
 * - If full path exists (.exe), launch directly
 * - Else fallback to CLI open
 */
const launchApp = async (rawApp) => {
  const app = rawApp.trim();
  if (!app) return;

  try {
    const isExePath = app.endsWith(".exe") && existsSync(app);
    const isFullPath = path.isAbsolute(app) && existsSync(app);

    if (isExePath || isFullPath) {
      await open(app, { wait: false });
    } else {
      // CLI command like "code", "spotify", etc.
      await open(app);
    }
  } catch (err) {
    console.error(`❌ Failed to launch app: ${app}`, err.message);
  }
};

/**
 * Final Launcher
 */
export const launchTemplate = async ({ apps = [], websites = [] }) => {
  try {
    for (const app of apps) {
      await launchApp(app);
    }

    for (const raw of websites) {
      const url = normalizeUrl(raw);
      try {
        await open(url);
      } catch (err) {
        console.error(`❌ Failed to open website: ${url}`, err.message);
      }
    }
  } catch (error) {
    console.error("🚨 Launcher crashed:", error.message);
    throw new Error("Could not launch template");
  }
};
