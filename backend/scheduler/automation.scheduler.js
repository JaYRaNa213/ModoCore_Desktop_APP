// backend/scheduler/automation.scheduler.js
import cron from "node-cron";
import Automation from "../models/automation.model.js";
import { launchApps } from "../utils/launchApps.js";

/**
 * Load and start scheduled automation tasks from the DB.
 */
export const startAutomationScheduler = async () => {
  try {
    const automations = await Automation.find({ schedule: { $exists: true } });

    automations.forEach((automation) => {
      if (cron.validate(automation.schedule)) {
        cron.schedule(automation.schedule, async () => {
          console.log(`⏰ Running scheduled automation: ${automation.name}`);
          await launchApps(automation.apps, automation.urls, automation.music);
        });
        console.log(`✅ Scheduled: ${automation.name} at ${automation.schedule}`);
      } else {
        console.warn(`⚠️ Invalid cron format for: ${automation.name}`);
      }
    });
  } catch (err) {
    console.error("❌ Error setting up scheduler:", err.message);
  }
};
