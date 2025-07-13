// controllers/template.controller.js
import Template from "../models/template.model.js";

// Create a new template
export const createTemplate = async (req, res, next) => {
  try {
    const { title, description, apps } = req.body;
    const newTemplate = await Template.create({ title, description, apps });
    res.status(201).json(newTemplate);
  } catch (err) {
    next(err);
  }
};

// Get all templates
export const getAllTemplates = async (req, res, next) => {
  try {
    const templates = await Template.find().sort({ usageCount: -1 });
    res.json(templates);
  } catch (err) {
    next(err);
  }
};

// Get single template
export const getTemplateById = async (req, res, next) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) return res.status(404).json({ message: "Template not found" });
    res.json(template);
  } catch (err) {
    next(err);
  }
};

// Increment usage
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
    next(err);
  }
};
