// models/automation.model.js
import mongoose from "mongoose";

// Sub-schema for each action
const actionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["app", "url", "music"],
      required: true,
    },
    value: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false } // Prevent automatic _id for subdocuments
);

// Main automation schema
const automationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Automation title is required"],
      trim: true,
      maxlength: 100,
    },
    actions: {
      type: [actionSchema],
      validate: [
        (val) => val.length > 0,
        "At least one action is required",
      ],
    },
    schedule: {
      type: String, // CRON expression like "0 9 * * 1-5"
      trim: true,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Automation", automationSchema);
