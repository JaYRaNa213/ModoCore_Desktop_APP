// backend/models/automationLogs.model.js
import mongoose from "mongoose";

const automationLogSchema = new mongoose.Schema({
  automation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Automation",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["success", "error"],
    required: true,
  },
  message: {
    type: String,
    default: "",
  },
});

export default mongoose.model("AutomationLog", automationLogSchema);
