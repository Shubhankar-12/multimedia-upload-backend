import { Document } from "mongoose";

export interface IFile {
  user_id: string;
  file_id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  tags: string[];
  viewCount: number;
  created_at: Date;
  updated_at: Date;
}

export interface IFileDocument extends IFile, Document {}
