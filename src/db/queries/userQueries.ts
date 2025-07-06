import { IUserDocument, UserModel } from "../user";
import { Types, Model } from "mongoose";

const ObjectId = Types.ObjectId;

export class UserQueries {
  private userModel: Model<IUserDocument>;

  constructor() {
    this.userModel = UserModel;
  }

  createUser = async (data: any): Promise<any> => {
    return await this.userModel.create(data);
  };

  getUserById = async (id: string): Promise<any> => {
    return await this.userModel
      .findById(new ObjectId(id))
      .projection({ password: 0 });
  };

  getUserByEmail = async (email: string): Promise<any> => {
    return await this.userModel.findOne({ email: email });
  };
}
