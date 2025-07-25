import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
// ,
    title: { type: String, required: true },
    description: { type: String },
    apps: [{ type: String, required: true }],
    websites: [{ type: String }], // ✅ Add this line
    usageCount: { type: Number, default: 0 },
    schedule: { type: String, default: null } 
  },
  { timestamps: true }
);

export default mongoose.model("Template", templateSchema);
