import Template from "../models/template.model.js";

import { launchTemplate as doLaunch } from "../utils/launcher.util.js";

// ✅ Create a new template
export const createTemplate = async (req, res, next) => {
  try {
    const { title, description, apps, websites } = req.body; // ✅ include websites
    const newTemplate = await Template.create({ title, description, apps, websites });
    res.status(201).json(newTemplate);
  } catch (err) {
    console.error("❌ Create Template Error:", err.message);
    next(err);
  }
};

// Get all templates (with optional limit)
export const getAllTemplates = async (req, res, next) => {
  try {
    const { limit } = req.query;
    const query = Template.find().sort({ usageCount: -1 });
    if (limit) query.limit(Number(limit));

    const templates = await query.exec();
    res.json(templates);
  } catch (err) {
    next(err);
  }
};


// ✅ Get a single template
export const getTemplateById = async (req, res, next) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) return res.status(404).json({ message: "Template not found" });
    res.json(template);
  } catch (err) {
    console.error("❌ Get Template By ID Error:", err.message);
    next(err);
  }
};

// ✅ Increment usage
export const incrementUsage = async (req, res, next) => {
  try {
    const template = await Template.findByIdAndUpdate(
      req.params.id,
      { $inc: { usageCount: 1 } },
      { new: true }
    );
    if (!template) return res.status(404).json({ message: "Template not found" });
    res.json(template);
  } catch (err) {
    console.error("❌ Increment Usage Error:", err.message);
    next(err);
  }
};


export const runTemplateNow = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) return res.status(404).json({ message: 'Not found' });
    await launchTemplate(template);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const launchTemplate = async (req, res) => {
  try {
    const { id } = req.params; // ✅ make sure this comes from the route
    const template = await Template.findById(id);
    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }

    await doLaunch(template); // this handles launching apps + websites
    template.usageCount += 1;
    await template.save();

    res.json({ message: "Template launched" });
  } catch (err) {
    console.error("🚨 Launch Error:", err.message);
    res.status(500).json({ error: "Launch failed", details: err.message });
  }
};