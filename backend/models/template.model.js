import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    apps: [{ type: String, required: true }],
    websites: [{ type: String }], // ✅ Add this line
    usageCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Template", templateSchema);
