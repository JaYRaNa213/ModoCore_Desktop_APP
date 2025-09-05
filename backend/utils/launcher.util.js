import open from "open";
import { existsSync, readdirSync } from "fs";
import { spawn } from "child_process";
import path from "path";
import AutomationLog from "../models/automationLogs.model.js";

/**
 * Normalize all types of URLs or schemes (http, mailto, tel, ftp, custom)
 */
const normalizeUrl = (input) => {
  const trimmed = input.trim();
  const hasScheme = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed);
  return hasScheme ? trimmed : "https://" + trimmed;
};

/**
 * Try to resolve and normalize executable path
 */
const resolveExecutablePath = (appPath) => {
  if (existsSync(appPath)) return appPath;

  const dir = path.dirname(appPath);
  const base = path.basename(appPath).toLowerCase();

  if (existsSync(dir)) {
    const match = readdirSync(dir).find(
      (f) => f.toLowerCase() === base
    );
    if (match) return path.join(dir, match);
  }

  return appPath;
};

/**
 * Launch an app: full .exe path or CLI shortcut
 */
const launchApp = async (rawApp) => {
  const app = rawApp.trim();
  if (!app) return;

  const resolved = resolveExecutablePath(app);
  const isExePath = resolved.endsWith(".exe") && existsSync(resolved);

  if (isExePath) {
    try {
      spawn(resolved, [], {
        detached: true,
        stdio: "ignore",
        shell: true, // ✅ important for .exe support on Windows
      }).unref();
      console.log(`✅ Launched: ${resolved}`);
    } catch (err) {
      console.error(`❌ Failed to launch app: ${resolved}`, err.message);
    }
  } else {
    // fallback to open if it's a CLI app
    try {
      await open(resolved);
      console.log(`✅ Launched CLI app: ${resolved}`);
    } catch (err) {
      console.error(`❌ Failed to open app: ${resolved}`, err.message);
    }
  }
};

/**
 * Final Launcher (for both guest + user)
 * @param {Object} template - the template object
 * @param {String} userId - ID of the user triggering this
 * @param {String} source - "manual" | "schedule" | "admin" | "guest"
 */
export const launchTemplate = async (
  template,
  userId = null,
  source = "manual"
) => {
  try {
    const { apps = [], websites = [] } = template;

    for (const app of apps) {
      await launchApp(app);
    }

    for (const raw of websites) {
      const url = normalizeUrl(raw);
      try {
        await open(url);
        console.log(`🌐 Opened website: ${url}`);
      } catch (err) {
        console.error(`❌ Failed to open website: ${url}`, err.message);
      }
    }

    if (source !== "guest") {
      await AutomationLog.create({
        automationId: template._id,
        triggeredBy: userId,
        status: "success",
        source,
      });
    }
  } catch (error) {
    console.error("🚨 Launcher crashed:", error.message);

    if (source !== "guest") {
      await AutomationLog.create({
        automationId: template._id,
        triggeredBy: userId,
        status: "failed",
        error: error.message,
        source,
      });
    }

    throw new Error("Could not launch template");
  }
};
