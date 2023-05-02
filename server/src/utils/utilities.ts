import { Response } from "express";
import { IResponse } from "../interfaces/IResponse";

export const getResponseObject = (
  status: "success" | "error",
  message: string,
  data: {} | []
) => {
  const _resp: IResponse = {
    status,
    message,
    data,
  };
  return _resp;
};

export const sendResponse = (
  res: Response,
  status: "success" | "error",
  message: string,
  data: {} | [],
  statusCode = 200
) => {
  const _resp = getResponseObject(status, message, data);
  res.status(statusCode).send(_resp);
};
