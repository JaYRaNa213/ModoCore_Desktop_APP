import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import templateRoutes from "./routes/template.routes.js";
import userRoutes from "./routes/user.routes.js";
import automationRoutes from "./routes/automation.routes.js";
import logRoutes from "./routes/log.routes.js";
import guestRoutes from "./routes/guest.route.js";
dotenv.config();
const app = express();



// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "2mb" }));
app.use(morgan("dev"));

// Routes
app.use("/api/templates", templateRoutes);
app.use("/api/users", userRoutes);
app.use("/api/automation", automationRoutes);
app.use("/api/automation-logs", logRoutes);

app.use("/api/guest", guestRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;
