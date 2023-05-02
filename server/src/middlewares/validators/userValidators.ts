import { RequestHandler } from "express";
import { check, validationResult } from "express-validator";
import { sendResponse } from "../../utils/utilities";

export const validateId: RequestHandler = async (req, res, next) => {
  try {
    if (!req.params._id) {
      return sendResponse(res, "error", "Validation Failed", {}, 422);
    }
    await check("_id").isString().isLength({ min: 24, max: 24 }).run(req);

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
    next(error);
  }
};
