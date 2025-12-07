import { Document } from "mongoose";

export interface IFileActivity {
  user_id: string;
  file_id: string;
  action: string;
  timestamp: Date;
}

export interface IFileActivityDocument extends IFileActivity, Document {}
