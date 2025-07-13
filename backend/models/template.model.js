// models/template.model.js
import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    apps: [{ type: String, required: true }],
    usageCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Template", templateSchema);
