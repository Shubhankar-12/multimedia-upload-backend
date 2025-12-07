import { model } from "mongoose";
import { FileActivitySchema } from "./schema";
import { IFileActivityDocument } from "./types";

export const FileActivityModel = model<IFileActivityDocument>(
  "fileActivity",
  FileActivitySchema,
  "fileActivities"
);
