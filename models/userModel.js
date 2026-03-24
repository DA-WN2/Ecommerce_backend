import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // 1. Added bcryptjs import

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "seller"],
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

// 2. Added method to compare passwords during Login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 3. Added pre-save hook to scramble the password during Registration
userSchema.pre("save", async function (next) {
  // If the password hasn't been modified (e.g., just updating user profile), skip hashing
  if (!this.isModified("password")) {
    next();
  }

  // Generate a salt and hash the password before saving
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;
