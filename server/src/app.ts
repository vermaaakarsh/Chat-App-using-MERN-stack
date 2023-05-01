import cors from "cors";
import express from "express";
import mongoose from "mongoose";

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
  res
    .status(200)
    .send({ status: "success", message: "Server connected!", data: {} });
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
