import express from "express";
import {
  signUpUser,
  deleteUser,
  getUserProfile,
  loginUser,
  updateUser,
  logoutUser,
  logoutAllSessions,
} from "../controllers/user.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

// Signup user
router.post("/", signUpUser);

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

export default router;
