import express from "express";
import { launchGuestTemplate } from "../controllers/guest.controller.js";

const router = express.Router();

// POST /api/guest/launch
router.post("/launch", launchGuestTemplate);

export default router;
