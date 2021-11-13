import express from "express";
import { dbConnection } from "./database/db-connection.js";
import userRoutes from "./routes/user.js";
import taskRoutes from "./routes/task.js";
import { Task } from "./models/task.js";
import { User } from "./models/user.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

app.all("*", (req, res) => res.status(404).send({ message: "Page not found" }));

app.listen(port, () => console.log(`server is up on port ${port}`));
