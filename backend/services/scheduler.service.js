// backend/services/scheduler.service.js
import cron from "node-cron";
import Automation from "../models/automation.model.js";
import { launchApps } from "../utils/launchApps.js";
import AutomationLog from "../models/automationLogs.model.js";

// Store active cron jobs in memory
const jobs = new Map();

export const scheduleAutomation = (automation) => {
  if (!automation.schedule || !automation.isActive) return;

  // Prevent re-scheduling
  if (jobs.has(automation._id.toString())) {
    jobs.get(automation._id.toString()).stop();
  }

  const job = cron.schedule(automation.schedule, async () => {
    try {
      await launchApps(automation.actions);

      // Log execution
      await AutomationLog.create({
        automation: automation._id,
        status: "success",
        message: "Automation executed successfully",
      });

    } catch (err) {
      await AutomationLog.create({
        automation: automation._id,
        status: "error",
        message: err.message,
      });
    }
  });

  jobs.set(automation._id.toString(), job);
};

export const stopAutomation = (id) => {
  const job = jobs.get(id.toString());
  if (job) {
    job.stop();
    jobs.delete(id.toString());
  }
};

export const rescheduleAllAutomations = async () => {
  const automations = await Automation.find({ schedule: { $ne: null }, isActive: true });
  automations.forEach(scheduleAutomation);
};
