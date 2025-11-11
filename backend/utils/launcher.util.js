// import open from "open";
// import { existsSync, readdirSync } from "fs";
// import { spawn } from "child_process";
// import path from "path";

// /**
//  * Normalize all types of URLs or schemes (http, mailto, tel, ftp, custom)
//  */
// const normalizeUrl = (input) => {
//   const trimmed = input.trim();
//   const hasScheme = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed);
//   return hasScheme ? trimmed : "https://" + trimmed;
// };

// /**
//  * Try to resolve and normalize executable path
//  */
// const resolveExecutablePath = (appPath) => {
//   if (existsSync(appPath)) return appPath;

//   const dir = path.dirname(appPath);
//   const base = path.basename(appPath).toLowerCase();

//   if (existsSync(dir)) {
//     const match = readdirSync(dir).find((f) => f.toLowerCase() === base);
//     if (match) return path.join(dir, match);
//   }

//   return appPath;
// };

// /**
//  * Launch a local app (.exe or CLI)
//  */
// const launchApp = async (rawApp) => {
//   const app = rawApp.trim();
//   if (!app) return;

//   const resolved = resolveExecutablePath(app);
//   const isExePath = resolved.endsWith(".exe") && existsSync(resolved);

//   if (isExePath) {
//     try {
//       spawn(resolved, [], {
//         detached: true,
//         stdio: "ignore",
//         shell: true, // Required for .exe support on Windows
//       }).unref();
//       console.log(`✅ Launched app: ${resolved}`);
//     } catch (err) {
//       console.error(`❌ Failed to launch app: ${resolved}`, err.message);
//     }
//   } else {
//     try {
//       await open(resolved);
//       console.log(`✅ Opened CLI app: ${resolved}`);
//     } catch (err) {
//       console.error(`❌ Failed to open CLI app: ${resolved}`, err.message);
//     }
//   }
// };

// /**
//  * Launch template: apps + websites
//  */
// export const launchTemplate = async (template) => {
//   try {
//     const { apps = [], websites = [] } = template;

//     for (const app of apps) {
//       await launchApp(app);
//     }

//     for (const raw of websites) {
//       const url = normalizeUrl(raw);
//       await open(url);
//       console.log(`🌐 Opened website: ${url}`);
//     }

//     console.log("🚀 Launch completed successfully");
//   } catch (error) {
//     console.error("🚨 Launcher crashed:", error.message);
//     throw new Error("Could not launch template");
//   }
// };


import { existsSync, readdirSync } from "fs";
import { spawn } from "child_process";
import path from "path";

/**
 * Try to resolve and normalize executable path
 */
const resolveExecutablePath = (appPath) => {
  if (existsSync(appPath)) return appPath;

  const dir = path.dirname(appPath);
  const base = path.basename(appPath).toLowerCase();

  if (existsSync(dir)) {
    const match = readdirSync(dir).find((f) => f.toLowerCase() === base);
    if (match) return path.join(dir, match);
  }

  return appPath;
};

/**
 * Launch a local app (.exe or CLI)
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
        shell: true, // Required for .exe support on Windows
      }).unref();
      console.log(`✅ Launched app: ${resolved}`);
    } catch (err) {
      console.error(`❌ Failed to launch app: ${resolved}`, err.message);
    }
  } else {
    try {
      spawn(app, [], {
        detached: true,
        stdio: "ignore",
        shell: true,
      }).unref();
      console.log(`✅ Opened CLI app: ${app}`);
    } catch (err) {
      console.error(`❌ Failed to open CLI app: ${app}`, err.message);
    }
  }
};

/**
 * Launch template: only apps
 */
export const launchTemplate = async (template) => {
  try {
    const { apps = [] } = template;

    for (const app of apps) {
      await launchApp(app);
    }

    console.log("🚀 Launch completed successfully (apps only)");
  } catch (error) {
    console.error("🚨 Launcher crashed:", error.message);
    throw new Error("Could not launch apps");
  }
};
