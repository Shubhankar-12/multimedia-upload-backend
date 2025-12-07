import { FileActivityModel, IFileActivityDocument } from "../activity";
import { Model } from "mongoose";

export class ActivityQueries {
  private activityModel: Model<IFileActivityDocument>;

  constructor() {
    this.activityModel = FileActivityModel;
  }

  logActivity = async (data: any): Promise<any> => {
    return await this.activityModel.create(data);
  };
}
