import { Response } from "express";

export const getResponseObject = (
  status: "success" | "error",
  message: string,
  data: {} | []
) => {
  const _resp = {
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
