import { launchTemplate as launchApps } from "../utils/launcher.util.js";

const extractApps = (payload = {}) => {
  if (!Array.isArray(payload.apps)) return [];
  return payload.apps
    .map((app) => (typeof app === "string" ? app.trim() : ""))
    .filter(Boolean);
};

export const launchGuestTemplate = async (req, res) => {
  try {
    const template = req.body || {};
    const apps = extractApps(template);

    if (!apps.length) {
      return res
        .status(400)
        .json({ success: false, message: "No apps provided to launch" });
    }

    await launchApps({ apps });

    res.json({
      success: true,
      message: "Guest template launch triggered",
      launched: apps.length,
    });
  } catch (error) {
    console.error("❌ Guest launch failed:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to launch guest template",
      error: error.message,
    });
  }
};
