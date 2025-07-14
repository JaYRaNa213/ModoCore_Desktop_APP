// backend/server.js
import app from "./app.js";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import { startAutomationScheduler } from "./scheduler/automation.scheduler.js";


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

connectDB();

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      startAutomationScheduler();
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error.message);
  });
