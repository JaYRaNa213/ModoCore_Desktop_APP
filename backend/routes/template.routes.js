// routes/template.routes.js
import express from "express";
import {
  createTemplate,
  getAllTemplates,
  getTemplateById,
  incrementUsage,
} from "../controllers/template.controller.js";

const router = express.Router();

router.post("/", createTemplate);
router.get("/", getAllTemplates);
router.get("/:id", getTemplateById);
router.post("/:id/use", incrementUsage);

export default router;
