// backend/scheduler/automation.scheduler.js
import cron from "node-cron";
import Automation from "../models/automation.model.js";
import { launchApps } from "../utils/launchApps.js";
import Template from '../models/template.model.js';
import { launchTemplate } from '../utils/launcher.util.js';
/**
 * Load and start scheduled automation tasks from the DB.
 */


export const startAutomationScheduler = () => {
  cron.schedule('* * * * *', async () => {
    const now = new Date();
    const templates = await Template.find({ schedule: { $ne: null } });

    for (const template of templates) {
      const [min, hour, day, month, dayOfWeek] = template.schedule.split(' ');
      const shouldRun = cron.validate(template.schedule) &&
        cron.schedule(template.schedule, () => true).nextDates().toDate().getMinutes() === now.getMinutes();
      if (shouldRun) {
        await launchTemplate(template);
      }
    }
  });
};
