import { RequestHandler } from "express";
import { check, validationResult } from "express-validator";
import { sendResponse } from "../../utils/utilities";

export const validatedObjectToRegisterUser: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    await check("username").isString().isLength({ min: 3 }).run(req);
    await check("email")
      .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      .run(req);
    await check("password")
      .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
      .run(req);
    if (req.body.profilePic) {
      await check("profilePic").isString().run(req);
    }

    const _result = validationResult(req);
    if (!_result.isEmpty()) {
      return sendResponse(
        res,
        "error",
        "Validation Failed",
        { data: _result.array() },
        422
      );
    }
    next();
  } catch (error: any) {
    console.log(error);
  }
};

export const validatedObjectToLoginUser: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    await check("email")
      .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      .run(req);
    await check("password")
      .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
      .run(req);

    const _result = validationResult(req);
    if (!_result.isEmpty()) {
      return sendResponse(
        res,
        "error",
        "Validation Failed",
        { data: _result.array() },
        422
      );
    }
    next();
  } catch (error: any) {
    console.log(error);
  }
};
