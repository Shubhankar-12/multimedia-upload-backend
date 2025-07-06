import { Document } from "mongoose";

export interface IUser {
  user_id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface IUserDocument extends IUser, Document {}
