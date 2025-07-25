// routes/template.routes.js
import express from "express";
import { authMiddleware}from "../middlewares/auth.middleware.js";
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

router.post("/", createTemplate);
router.get("/", getAllTemplates);
router.get("/:id", getTemplateById);
router.post("/:id/use", incrementUsage);
router.post("/:id/launch", launchTemplate);
router.delete("/:id", deleteTemplate);
router.put('/:id', authMiddleware, EditTemplate);

export default router;
