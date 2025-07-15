// routes/template.routes.js
import express from "express";
import {
  createTemplate,
  getAllTemplates,
  getTemplateById,
  incrementUsage,
  runTemplateNow,
  launchTemplate,
  launchTemplateById
} from "../controllers/template.controller.js";

const router = express.Router();

router.post("/", createTemplate);
router.get("/", getAllTemplates);
router.get("/:id", getTemplateById);
router.post("/:id/use", incrementUsage);
router.post('/:id/launch', runTemplateNow);
// routes/template.routes.js
router.post("/:id/launch", launchTemplate);
router.post('/:id/launch', launchTemplateById);



export default router;
