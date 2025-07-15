// 📁 models/automationLogs.model.js
import mongoose from "mongoose";

const automationLogSchema = new mongoose.Schema(
  {
    automationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Automation",
      required: true,
    },
    triggeredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["success", "failed"],
      default: "success",
    },
    error: {
      type: String,
      default: null,
    },
    source: {
      type: String,
      enum: ["manual", "schedule", "admin"],
      default: "manual",
    },
    triggeredBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: false, // ✅ allow null for scheduled launches
},
  },
  { timestamps: true }
);

export default mongoose.model("AutomationLog", automationLogSchema);
