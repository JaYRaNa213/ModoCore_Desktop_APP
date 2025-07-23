// utils/launchApps.js
import { exec } from "child_process";
import path from "path";
import open from "open";

/**
 * Launches a list of desktop applications based on OS
 * @param {string[]} apps - Array of app names/paths to launch
 */
export const launchApps = async (actions = []) => {
  for (const action of actions) {
    try {
      if (action.type === "app") {
        // Launch a desktop application
        exec(action.value, (err) => {
          if (err) console.error(`❌ Failed to launch app: ${action.value}`, err.message);
        });
      } else if (action.type === "url" || action.type === "music") {
        // Open a URL or music link
        await open(action.value);
      } else {
        console.warn("⚠️ Unknown automation type:", action);
      }
    } catch (error) {
      console.error("🚨 Error in launchApps:", error.message);
    }
  }
};