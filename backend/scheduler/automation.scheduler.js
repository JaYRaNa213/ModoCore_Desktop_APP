// backend/scheduler/automation.scheduler.js
import cron from "node-cron";
import parser from "cron-parser";
import Template from "../models/template.model.js";
import { launchTemplate } from "../utils/launcher.util.js";

/**
 * Load and start scheduled automation tasks from DB every minute.
 */
export const startAutomationScheduler = () => {
  cron.schedule('* * * * *', async () => {
    try {
      const now = Date.now();
      const templates = await Template.find({ schedule: { $ne: null } });

      for (const template of templates) {
        try {
          const interval = parser.parseExpression(template.schedule);
          const nextRun = interval.next().getTime();
          const diff = Math.abs(nextRun - now);

          if (diff < 60000) {
            console.log(`⏰ Launching scheduled template: ${template.title}`);
            await launchTemplate(template);
          }
        } catch (err) {
          console.error(`❌ Invalid cron expression for "${template.title}":`, template.schedule);
        }
      }
    } catch (err) {
      console.error("🚨 Scheduler error:", err.message);
    }
  });

  console.log("✅ Automation scheduler started (every minute)");
};
