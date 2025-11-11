export const launchGuestTemplate = async (req, res) => {
  try {
    const template = req.body; // { apps: [], websites: [] }

    if (!template) {
      return res.status(400).json({ success: false, message: "No template provided" });
    }

    res.json({ success: true, message: "Guest template launch acknowledged" });
  } catch (error) {
    console.error("❌ Guest launch failed:", error.message);
    res.status(500).json({ success: false, message: "Failed to launch guest template", error: error.message });
  }
};
