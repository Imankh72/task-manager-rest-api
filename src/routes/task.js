import express from "express";
import {
  createTask,
  deleteTask,
  getAllUserTasks,
  getTask,
  updateTask,
} from "../controllers/task.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

// Create a task
router.post("/", auth, createTask);

// Get all user tasks
router.get("/", auth, getAllUserTasks);

// Get a task
router.get("/:id", auth, getTask);

// Update a task
router.patch("/:id", auth, updateTask);

// Delete a task
router.delete("/:id", auth, deleteTask);

export default router;
