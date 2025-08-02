// routes/template.routes.js
import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createTemplate,
  getAllTemplates,
  getTemplateById,
  incrementUsage,
  deleteTemplate,
  launchTemplate,
  EditTemplate
} from "../controllers/template.controller.js";

const router = express.Router();

// 🔒 Auth-protected: Create/Edit/Delete should be allowed only for logged-in users
router.post("/", authMiddleware, createTemplate);
router.put("/:id", authMiddleware, EditTemplate);
router.delete("/:id", authMiddleware, deleteTemplate);

// ✅ Public: Fetch and use templates
router.get("/",authMiddleware, getAllTemplates);
router.get("/:id",authMiddleware, getTemplateById);
router.post("/:id/use",authMiddleware, incrementUsage);
router.post("/:id/launch",authMiddleware, launchTemplate);

export default router;
