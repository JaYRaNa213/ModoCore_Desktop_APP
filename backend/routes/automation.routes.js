// routes/automation.routes.js
import express from "express";
import { triggerAutomation } from "../controllers/automation.controller.js";

import { runAutomation, createAutomation, getMyAutomations } from "../controllers/automation.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/launch", triggerAutomation);
router.post("/run", authMiddleware, runAutomation);
router.post("/", authMiddleware, createAutomation);
router.get("/", authMiddleware, getMyAutomations);

export default router;
