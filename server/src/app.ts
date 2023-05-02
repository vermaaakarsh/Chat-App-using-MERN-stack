import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import authRoutes from "./routers/auth";
import { sendResponse } from "./utils/utilities";

const app = express();
const connectionString = process.env.CONNECTION_STRING || "";
const port = process.env.PORT;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/auth", authRoutes);

app.get("/health", (req, res) => {
  return sendResponse(res, "success", "Server working!", {}, 200);
});

async function startServer() {
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(connectionString);
    app.listen(port, () => {
      console.log(`Server connected on port:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
