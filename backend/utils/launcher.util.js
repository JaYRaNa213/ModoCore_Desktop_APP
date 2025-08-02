// launcher.util.js
import open from "open";
import { existsSync } from "fs";
import path from "path";
import AutomationLog from "../models/automationLogs.model.js";

/**
 * Normalize website URL (adds https:// if missing)
 */
/**
 * Normalize all types of URLs or schemes (http, mailto, tel, ftp, custom)
 */
const normalizeUrl = (input) => {
  const trimmed = input.trim();

  // Match valid URI scheme (e.g., http:, mailto:, tel:, spotify:)
  const hasScheme = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed);

  if (hasScheme) {
    return trimmed;
  }

  // If no scheme and it's likely a domain, add https://
  return "https://" + trimmed;
};

/**
 * Launch an app: full .exe path or CLI shortcut
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
      await open(app); // CLI name
    }
  } catch (err) {
    console.error(`❌ Failed to launch app: ${app}`, err.message);
    throw err;
  }
};

/**
 * Final Launcher
 * @param {Object} template - the template object
 * @param {String} userId - ID of the user triggering this
 * @param {String} source - "manual" | "schedule" | "admin"
 */
export const launchTemplate = async (template, userId = null, source = "manual") => {
  try {
    const { apps = [], websites = [] } = template;

    for (const app of apps) {
      await launchApp(app);
    }

    for (const raw of websites) {
      const url = normalizeUrl(raw);
      try {
        await open(url);
      } catch (err) {
        console.error(`❌ Failed to open website: ${url}`, err.message);
        throw err;
      }
    }

    await AutomationLog.create({
      automationId: template._id,
      triggeredBy: userId,
      status: "success",
      source,
    });

  } catch (error) {
    console.error("🚨 Launcher crashed:", error.message);

    // Optional: also log failure
    await AutomationLog.create({
      automationId: template._id,
      triggeredBy: userId,
      status: "failed",
      error: error.message,
      source,
    });

    throw new Error("Could not launch template");
  }
};
