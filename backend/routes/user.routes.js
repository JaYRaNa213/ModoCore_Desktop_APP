// routes/user.routes.js
import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// Register new user
router.post("/register", registerUser);

// Login existing user
router.post("/login", loginUser);

// Get current user profile (protected route)
router.get("/me", authMiddleware, getUserProfile);

export default router;
