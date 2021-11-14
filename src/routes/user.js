import express from "express";
import {
  signUpUser,
  deleteUser,
  getUserProfile,
  loginUser,
  updateUser,
  logoutUser,
  logoutAllSessions,
  uploadImage,
  deleteImage,
  getProfileImage,
} from "../controllers/user.js";

import { auth } from "../middlewares/auth.js";
import { uploadErrorHandler } from "../middlewares/uploadErrorHandler.js";
import { uploader } from "../utils/uploader.js";

const router = express.Router();

// Signup user
router.post("/signUp", signUpUser);

// Login user
router.post("/login", loginUser);

// Logout user
router.post("/logout", auth, logoutUser);

// Logout all sessions
router.post("/logoutAll", auth, logoutAllSessions);

// Get user profile
router.get("/me", auth, getUserProfile);

// Update a user
router.patch("/me", auth, updateUser);

// Delete a user
router.delete("/me", auth, deleteUser);

// Upload profile image
router.post(
  "/me/profileImage",
  auth,
  uploader.single("upload"),
  uploadImage,
  uploadErrorHandler
);

// Get profile image
router.get("/:id/profileImage", auth, getProfileImage);

// Delete profile image
router.delete("/me/profileImage", auth, deleteImage);

export default router;
