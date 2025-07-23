// backend/routes/admin.routes.js
import express from "express";
import Automation from "../models/automation.model.js";
import { scheduleAutomation } from "../services/scheduler.service.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// ✅ Admin-only middleware
const adminOnly = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};

// ✅ POST /api/admin/automations
router.post("/automations", authMiddleware, adminOnly, async (req, res) => {
  try {
    const automation = await Automation.create({ ...req.body, owner: req.user._id });
    scheduleAutomation(automation);
    res.status(201).json(automation);
  } catch (err) {
    res.status(500).json({ message: "Failed to create automation", error: err.message });
  }
});

export default router;
