import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"]
    },
    passwordHash: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, returnedObject) => {
        delete returnedObject.passwordHash;
        return returnedObject;
      }
    }
  }
);

userSchema.methods.verifyPassword = function verifyPassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

userSchema.statics.hashPassword = function hashPassword(plainPassword) {
  return bcrypt.hash(plainPassword, 12);
};

export const User = mongoose.model("User", userSchema);
