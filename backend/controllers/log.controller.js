// controllers/log.controller.js
import AutomationLog from "../models/automationLogs.model.js";

// GET /api/automation-logs
export const getLogsForUser = async (req, res) => {
  try {
    const logs = await AutomationLog.find({ triggeredBy: req.user._id })
      .populate("automationId", "title schedule")
      .sort({ createdAt: -1 });

    res.status(200).json(logs);
  } catch (err) {
    console.error("Error fetching logs:", err);
    res.status(500).json({ message: "Failed to fetch logs" });
  }
};
