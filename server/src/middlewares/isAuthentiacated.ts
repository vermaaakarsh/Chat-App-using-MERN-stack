import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/utilities";

const isAuthenticated: RequestHandler = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      return sendResponse(res, "error", "Authentication failed!", {}, 401);
    }
    const token = authHeader.split(" ")[1];
    let decodedToken: { userId: string; iat: number; exp: number };
    try {
      decodedToken = <any>jwt.verify(token, process.env.SECRET_KEY || "");
    } catch (error) {
      return sendResponse(res, "error", "Authentication failed!", {}, 401);
    }
    if (!decodedToken) {
      return sendResponse(res, "error", "Authentication failed!", {}, 401);
    }
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    next(error);
  }
};

export { isAuthenticated };
