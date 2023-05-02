import bcrypt from "bcryptjs";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

import { IUser } from "../interfaces/IUser";
import User from "../models/user";
import { sendResponse } from "../utils/utilities";

export const registerUser: RequestHandler = async (req, res, next) => {
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
    next(error);
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const userDetails: { email: string; passwrod: string } = {
      email: req.body.email,
      passwrod: req.body.password,
    };

    const user = await User.findOne({ email: userDetails.email });
    if (!user) {
      return sendResponse(res, "error", "Email doesn't exists!", {}, 404);
    }
    const status = await bcrypt.compare(userDetails.passwrod, user.password);
    if (status) {
      const token = jwt.sign(
        { userId: user._id },
        process.env.SECRET_KEY || "",
        { expiresIn: "1h" }
      );
      return sendResponse(
        res,
        "success",
        "Logged In successfully!",
        { token },
        200
      );
    } else {
      return sendResponse(res, "error", "Credentials mismatched!", {}, 401);
    }
  } catch (error: any) {
    next(error);
  }
};
