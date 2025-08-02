// backend/models/user.model.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Define schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    profileImage: {
      required: false,
  type: String,
  default: "",
}
,
    templates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Template",
      },
      
    ],
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with hashed one
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export model
const User = mongoose.model("User", userSchema);
export default User;
