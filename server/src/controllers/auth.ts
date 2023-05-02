import bcrypt from "bcryptjs";
import { RequestHandler } from "express";

import { IUser } from "../interfaces/IUser";
import User from "../models/user";
import { sendResponse } from "../utils/utilities";

export const registerUser: RequestHandler = async (req, res) => {
  try {
    const encryptedPassword = await bcrypt.hash(req.body.password, 13);
    const _userObj: IUser = {
      username: req.body.username,
      email: req.body.email,
      password: encryptedPassword,
    };
    const user = new User(_userObj);
    const createdUser = await user.save();
    if (createdUser) {
      return sendResponse(
        res,
        "success",
        "Registration successfull!",
        { userId: createdUser._id },
        201
      );
    } else {
      return sendResponse(res, "error", "Registration failed!", {}, 400);
    }
  } catch (error: any) {
    console.log(error);
    return sendResponse(res, "error", "Internal server error!", {}, 500);
  }
};
