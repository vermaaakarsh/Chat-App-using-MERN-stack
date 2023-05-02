import { RequestHandler } from "express";

import User from "../models/user";
import { sendResponse } from "../utils/utilities";

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    let userId: string;
    if (req.params._id) {
      userId = req.params._id;
    } else {
      userId = req.userId;
    }
    const user = await User.findById(userId, {
      username: 1,
      email: 1,
      profilePic: 1,
    });
    if (!user) {
      return sendResponse(res, "error", "User doesn't exists!", {}, 404);
    }
    return sendResponse(
      res,
      "success",
      "User details fetched successfully!",
      { user },
      200
    );
  } catch (error: any) {
    next(error);
  }
};
