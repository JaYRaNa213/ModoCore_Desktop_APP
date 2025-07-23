

import express from "express";

import {
  runAutomation,
  createAutomation,
  getUserAutomations,
  updateAutomation,
  toggleAutomationStatus,
  triggerAutomation
} from "../controllers/automation.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware,getUserAutomations);
router.post("/", authMiddleware,createAutomation);
router.put("/:id", authMiddleware,updateAutomation);
router.patch("/:id/status", authMiddleware ,toggleAutomationStatus);

// Additional:
router.post("/run", authMiddleware,runAutomation);          // Run by preset ID
router.post("/trigger",authMiddleware, triggerAutomation);  // Launch custom actions instantly

export default router;