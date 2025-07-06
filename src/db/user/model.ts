import { model } from "mongoose";
import { UserSchema } from "./schema";
import { IUserDocument } from "./types";

export const UserModel = model<IUserDocument>("user", UserSchema, "users");
