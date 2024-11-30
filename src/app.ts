import express, { Application } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import messageRoutes from "./routes/messageRoutes";

const app: Application = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/messages", messageRoutes);

// Database Connection
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/openkids-bot";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

export default app;
