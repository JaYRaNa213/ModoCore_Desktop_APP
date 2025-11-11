// backend/services/sync.service.js
import Template from "../models/template.model.js";

/**
 * Sync templates from localStorage to MongoDB after login.
 * 
 * @param {string} userId - Authenticated user's ID
 * @param {Array} localTemplates - Templates from localStorage
 * @returns {Object} - Summary of sync results
 */
export const syncTemplatesToDB = async (userId, localTemplates = []) => {
  if (!Array.isArray(localTemplates) || !userId) return { added: 0, skipped: 0 };

  let added = 0, skipped = 0;

  for (const tpl of localTemplates) {
    const { title, description, apps, websites, schedule } = tpl;

    // Check for duplicate by title + apps (can customize logic)
    const existing = await Template.findOne({ title, apps, userId });

    if (existing) {
      skipped++;
      continue;
    }

    try {
      await Template.create({
        title,
        description,
        apps,
        websites,
        schedule,
        usageCount: 0,
        userId,
        userType: "member",
        guestId: null,
        guestName: null,
      });
      added++;
    } catch (err) {
      console.error("Sync error:", err.message);
      skipped++;
    }
  }

  return { added, skipped };
};
