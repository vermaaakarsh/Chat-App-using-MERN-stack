import cors from "cors";
import express from "express";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import authRoutes from "./routers/auth";
import ProjectError from "./helpers/error";
import { IResponse } from "./interfaces/IResponse";
import userRoutes from "./routers/user";
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
app.use("/user", userRoutes);

app.get("/health", (req, res) => {
  return sendResponse(res, "success", "Server working!", {}, 200);
});

app.use(
  (error: ProjectError, req: Request, res: Response, next: NextFunction) => {
    let message: string;
    let statusCode: number;
    if (!!error.statusCode && error.statusCode < 500) {
      message = error.message;
      statusCode = error.statusCode;
    } else {
      console.log(error);
      message = "Something went wrong please try after sometime!";
      statusCode = 500;
    }
    const resp: IResponse = { status: "error", message, data: {} };
    if (error.data) {
      resp.data = error.data;
    }
    res.status(statusCode).send(resp);
    next();
  }
);

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
