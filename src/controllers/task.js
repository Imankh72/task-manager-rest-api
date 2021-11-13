import { Task } from "../models/task.js";

// Create a task
export const createTask = async (req, res) => {
  const fields = Object.keys(req.body);
  const allowedFields = ["description", "completed"];
  const isValidOperation = fields.every((field) =>
    allowedFields.includes(field)
  );

  if (!isValidOperation)
    return res.status(400).send({ message: "Invalid fields" });

  try {
    const task = await Task.create({ ...req.body, owner: req.user.id });
    res.status(201).send({ message: "Task created", task });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get all tasks
export const getAllUserTasks = async (req, res) => {
  const filterFields = { owner: req.user._id };
  if (req.query.completed)
    filterFields.completed = req.query.completed === "true" ? true : false;

  const sort = {};
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  const limitNumber = +req.query.limit;
  const skipNumber = +req.query.skip;

  try {
    const tasks = await Task.find(filterFields)
      .limit(limitNumber)
      .skip(skipNumber)
      .sort(sort);
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get a task
export const getTask = async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) return res.status(404).send({ message: "Task not found" });
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  const fields = Object.keys(req.body);
  const allowedFields = ["description", "completed"];
  const isValidOperation = fields.every((field) =>
    allowedFields.includes(field)
  );

  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid fields" });

  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) return res.status(404).send({ message: "Task not found" });

    fields.forEach((field) => (task[field] = req.body[field]));
    await task.save();

    res.status(200).send({ message: "Task updated", task });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOneAndDelete({ _id, owner: req.user._id });

    if (!task) return res.status(404).send({ message: "Task not found" });
    res.status(200).send({ message: "Task deleted" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
