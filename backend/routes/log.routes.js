// routes/log.routes.js
import express from "express";
import { getLogsForUser } from "../controllers/log.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.get("/", authMiddleware, getLogsForUser);

export default router;
