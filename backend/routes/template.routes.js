// backend/routes/template.routes.js
import express from "express";
import {
  createTemplate,
  getAllTemplates,
  getTemplateById,
  deleteTemplate,
  EditTemplate,
  launchTemplate,
} from "../controllers/template.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * Optional authentication middleware
 * Allows guest access but validates token if present
 */
const optionalAuth = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    // No token → allow guest
    return next();
  }

  try {
    await authMiddleware(req, res, next);
  } catch (err) {
    console.error("OptionalAuth Error:", err.message);
    // Invalid token → treat as guest, not as error
    return next();
  }
};

router.post("/", optionalAuth, createTemplate);
router.get("/", optionalAuth, getAllTemplates);
router.get("/:id", optionalAuth, getTemplateById);
router.put("/:id", optionalAuth, EditTemplate);
router.delete("/:id", optionalAuth, deleteTemplate);
router.post("/:id/launch", optionalAuth, launchTemplate);

export default router;
