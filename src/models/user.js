import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Task } from "./task.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User must have a name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "User must have an email"],
      trim: true,
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, "Email is not valid"],
    },
    age: {
      type: Number,
      default: 18,
      validate(value) {
        if (value <= 0) throw new Error("Age must be a positive number");
      },
    },
    password: {
      type: String,
      required: [true, "User must have a password"],
      trim: true,
      minlength: 8,
      validate: [validator.isStrongPassword, "Enter a strong password"],
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;
  delete user.tokens;

  return user;
};

// Generate token for user
userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign(
    { _id: this._id.toString() },
    "node-express-mongodb-mongoose-jwt",
    { expiresIn: "45d" }
  );

  this.tokens = this.tokens.concat({ token });
  await this.save();

  return token;
};

// Find out whether the user has credentials or not
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Unable to login");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Unable to login");

  return user;
};

// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Delete user tasks when user removed
userSchema.pre("remove", async function (next) {
  await Task.deleteMany({ owner: this._id });
  next();
});

export const User = new mongoose.model("User", userSchema);
