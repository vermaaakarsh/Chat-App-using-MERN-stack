import cors from "cors";
import express from "express";
import mongoose from "mongoose";

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

app.get("/health", (req, res) => {
  sendResponse(res, "success", "Server working!", {}, 200);
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
