import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    userType: {
      type: String,
      enum: ["member", "guest"],
      default: "guest",
    },
    guestId: {
      type: String,
      default: null,
      index: true,
    },
    guestName: {
      type: String,
      default: "Guest User",
    },
    title: { type: String, required: true },
    description: { type: String },
    apps: [{ type: String, required: true }],
    websites: [{ type: String }],
    usageCount: { type: Number, default: 0 },
    schedule: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Template", templateSchema);
