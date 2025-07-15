// routes/template.routes.js
import express from "express";
import {
  createTemplate,
  getAllTemplates,
  getTemplateById,
  incrementUsage,
  launchTemplate, // ✅ Keep only this (it uses doLaunch)
} from "../controllers/template.controller.js";

const router = express.Router();

router.post("/", createTemplate);
router.get("/", getAllTemplates);
router.get("/:id", getTemplateById);
router.post("/:id/use", incrementUsage);
router.post("/:id/launch", launchTemplate); // ✅ Use this one only

export default router;
