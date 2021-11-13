import { User } from "../models/user.js";

// Signup user
export const signUpUser = async (req, res) => {
  const fields = Object.keys(req.body);
  const allowedFields = ["name", "email", "age", "password"];
  const isValidOperation = fields.every((field) =>
    allowedFields.includes(field)
  );
  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid fields" });

  try {
    const user = await User.create(req.body);
    const token = await user.generateAuthToken();
    res.status(201).send({ message: "User signed up", user, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.status(200).send({ message: `${user.name} logged in`, user, token });
  } catch (error) {
    res.status(400).send({ message: "Unable to login" });
  }
};

// Logout user
export const logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((tok) => tok.token !== req.token);
    await req.user.save();
    res.status(200).send({ message: `${req.user.name} logged out` });
  } catch (error) {
    res.status(500).send({ message: "Cannot logout the user" });
  }
};

// Logout all sessions
export const logoutAllSessions = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send({ message: "All sessions logged out" });
  } catch (error) {
    res.status(500).send({ message: "Cannot logout" });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  res.status(200).send(req.user);
};

// Update a user
export const updateUser = async (req, res) => {
  const fields = Object.keys(req.body);
  const allowedFields = ["name", "email", "password", "age"];
  const isValidOperation = fields.every((field) =>
    allowedFields.includes(field)
  );

  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid fields!" });

  try {
    const user = req.user;
    fields.forEach((field) => (user[field] = req.body[field]));
    await user.save();

    res.status(200).send({ message: "User updated", user });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    await req.user.remove();
    res.status(200).send({ message: "User deleted", user: req.user });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
