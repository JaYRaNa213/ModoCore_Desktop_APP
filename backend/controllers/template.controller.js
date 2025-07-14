import Template from "../models/template.model.js";

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
