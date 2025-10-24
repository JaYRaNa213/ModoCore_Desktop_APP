import Template from "../models/template.model.js";

import { launchTemplate as doLaunch } from "../utils/launcher.util.js";

// ✅ Create a new template
export const createTemplate = async (req, res, next) => {
  try {
    const { title, description, apps, websites } = req.body; // ✅ include websites
    const newTemplate = await Template.create({ title, description, apps, websites ,userId: req.user.id,});
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
    const query = Template.find({ userId: req.user.id }).sort({ usageCount: -1 });
    if (limit) query.limit(Number(limit));

    const templates = await query.exec();
    res.json(templates);
  } catch (err) {
    next(err);
  }
};


// ✅ Get a single template (with ownership check)
export const getTemplateById = async (req, res, next) => {
  try {
    const template = await Template.findOne({
      _id: req.params.id,
      userId: req.user.id, // 👈 user-scoped
    });

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
    const { id } = req.params;
    const template = await Template.findById(id);
    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }

    await doLaunch(template, req.user, "user"); // ✅ FIXED
    template.usageCount += 1;
    await template.save();

    res.json({ message: "Template launched successfully" });
  } catch (err) {
    console.error("🚨 Launch Error:", err.message);
    res.status(500).json({ error: "Launch failed", details: err.message });
  }
};




// ✅ Delete a template (only if owned by user)
export const deleteTemplate = async (req, res, next) => {
  try {
    const deleted = await Template.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id, // 👈 verify owner
    });

    if (!deleted) {
      return res.status(404).json({ message: "Template not found" });
    }

    res.json({ message: "Template deleted successfully" });
  } catch (err) {
    console.error("❌ Delete Template Error:", err.message);
    next(err);
  }
};



export const EditTemplate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, apps, websites, schedule } = req.body;

    const template = await Template.findById(id);
    if (!template) return res.status(404).json({ message: "Template not found" });

    // Ensure the user owns the template
    if (template.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized: Not your template" });
    }

    // Update fields
    template.title = title || template.title;
    template.description = description || template.description;
    template.apps = apps || template.apps;
    template.websites = websites || template.websites;
    template.schedule = schedule || template.schedule;

    await template.save();

    res.json({ message: "Template updated successfully", template });
  } catch (err) {
    console.error("❌ Update Template Error:", err.message);
    next(err);
  }
};
