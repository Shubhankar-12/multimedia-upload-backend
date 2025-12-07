import { Document } from "mongoose";

export interface IFile {
  user_id: string; // or Types.ObjectId
  file_id: string;
  name: string;
  originalName: string;
  s3_key: string;
  url?: string;
  size: number;
  mimeType: string;
  type?: string;
  tags: string[];
  shared_with: string[]; // Array of User IDs
  share_link_token?: string;
  viewCount: number;
  created_at: Date;
  updated_at: Date;
}

export interface IFileDocument extends IFile, Document {}
