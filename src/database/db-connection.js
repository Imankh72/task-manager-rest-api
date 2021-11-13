import mongoose from "mongoose";

const url = "mongodb://localhost:27017/task-manager-api";
export const dbConnection = mongoose.connect(url);
