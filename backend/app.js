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
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "app://",   // allow any app:// (not just index.html)
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow curl/Electron internal

      if (allowedOrigins.some(o => origin.startsWith(o))) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed for " + origin), false);
    },
    credentials: true,
  })
);


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
