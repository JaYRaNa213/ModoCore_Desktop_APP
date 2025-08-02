// routes/user.routes.js
import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// ✅ Register a new user
router.post("/register", registerUser);

// ✅ Login existing user
router.post("/login", loginUser);

// ✅ Get current logged-in user profile
router.get("/me", authMiddleware, getUserProfile);

export default router;
