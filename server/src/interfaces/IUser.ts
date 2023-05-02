import { ObjectId } from "mongoose";

export type IUser = {
  _id?: ObjectId;
  username: string;
  email: string;
  password: string;
  profilePic?: string;
  isAdmin?: boolean;
  isActive?: boolean;
  isDeleted?: boolean;
};
