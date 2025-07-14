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

// @desc Create a new automation preset
export const createAutomation = async (req, res) => {
  try {
    const { title, actions } = req.body;

    const preset = await Automation.create({
      title,
      actions,
      owner: req.user._id,
    });

    res.status(201).json(preset);
  } catch (err) {
    res.status(500).json({ message: "Failed to create automation", error: err.message });
  }
};

// @desc Get all presets for current user
export const getMyAutomations = async (req, res) => {
  try {
    const presets = await Automation.find({ owner: req.user._id });
    res.status(200).json(presets);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch automations" });
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
