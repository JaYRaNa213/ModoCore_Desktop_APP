// controllers/automation.controller.js
// controllers/automation.controller.js
import { launchApps } from "../utils/launchApps.js";
import Automation from "../models/automation.model.js";

/**
 * Launch multiple apps sent via POST request body
 */



// @desc Trigger an automation preset
// @route POST /api/automation/run
export const runAutomation = async (req, res) => {
  try {
    const { templateId } = req.body;

    const preset = await Automation.findById(templateId).populate("owner", "-password");
    if (!preset) return res.status(404).json({ message: "Automation preset not found" });

    await launchApps(preset.actions); // Launch apps, tabs, music, etc.

    res.status(200).json({ message: "Automation launched successfully!" });
  } catch (err) {
    console.error("🚨 Error launching automation:", err.message);
    res.status(500).json({ message: "Failed to launch automation" });
  }
};

export const createAutomation = async (req, res) => {
  try {
    const { title, actions, schedule } = req.body;
    const owner = req.user._id;

    const automation = await Automation.create({
      title,
      actions,
      schedule,
      owner,
    });

    res.status(201).json(automation);
  } catch (err) {
    console.error("Create automation error:", err);
    res.status(500).json({ error: "Failed to create automation" });
  }
};




export const triggerAutomation = async (req, res) => {
  try {
    const { apps } = req.body;

    if (!Array.isArray(apps) || apps.length === 0) {
      return res.status(400).json({ message: "No apps provided to launch" });
    }

    launchApps(apps);
    res.status(200).json({ message: "Apps launching initiated" });
  } catch (err) {
    console.error("Automation Error:", err.message);
    res.status(500).json({ message: "Automation failed", error: err.message });
  }
};

// 🔍 Get user's automations
export const getUserAutomations = async (req, res) => {
  try {
    const automations = await Automation.find({ owner: req.user._id });
    res.json(automations);
  } catch (err) {
    console.error("Get automations error:", err);
    res.status(500).json({ error: "Failed to fetch automations" });
  }
};


// ✏️ Update an automation
export const updateAutomation = async (req, res) => {
  try {
    const automation = await Automation.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true }
    );
    if (!automation) return res.status(404).json({ error: "Automation not found" });

    res.json(automation);
  } catch (err) {
    console.error("Update automation error:", err);
    res.status(500).json({ error: "Failed to update automation" });
  }
};

// ⏯️ Toggle active status
export const toggleAutomationStatus = async (req, res) => {
  try {
    const { isActive } = req.body;

    const automation = await Automation.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { isActive },
      { new: true }
    );

    if (!automation) return res.status(404).json({ error: "Automation not found" });

    res.json(automation);
  } catch (err) {
    console.error("Toggle automation error:", err);
    res.status(500).json({ error: "Failed to update automation status" });
  }
};