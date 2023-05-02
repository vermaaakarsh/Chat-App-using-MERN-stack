import { ObjectId } from "mongoose";

export type IUser = {
  _id?: ObjectId;
  username: string;
  email: string;
  password: string;
  isActive?: boolean;
  isDeleted?: boolean;
};
