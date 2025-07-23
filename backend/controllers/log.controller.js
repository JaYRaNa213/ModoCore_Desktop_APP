// controllers/log.controller.js
import AutomationLog from "../models/automationLogs.model.js";

// GET /api/automation-logs
export const getLogsForUser = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized. User info missing." });
    }

    const { status, source } = req.query;

    const filter = {
      triggeredBy: req.user._id,
    };

    if (status) {
      filter.status = status.toLowerCase(); // "success" or "failed"
    }

    if (source) {
      filter.source = source.toLowerCase(); // "manual", "schedule", etc.
    }

    const logs = await AutomationLog.find(filter)
      .populate("automationId", "title schedule")
      .sort({ createdAt: -1 });

    res.status(200).json(logs);
  } catch (err) {
    console.error("❌ Error fetching logs:", err.message);
    res.status(500).json({ message: "Failed to fetch logs", error: err.message });
  }
};
