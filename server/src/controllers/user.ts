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

export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const userId: string = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return sendResponse(res, "error", "User doesn't exists!", {}, 404);
    }
    user.username = req.body.username;
    user.profilePic = req.body.profilePic;
    const updatedUser = await user.save();
    if (updatedUser) {
      return sendResponse(
        res,
        "success",
        "Details updated successfully!",
        { userId: updatedUser._id },
        201
      );
    } else {
      return sendResponse(res, "error", "Registration failed!", {}, 400);
    }
  } catch (error: any) {
    next(error);
  }
};
