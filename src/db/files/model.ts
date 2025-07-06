import { model } from "mongoose";
import { FileSchema } from "./schema";
import { IFileDocument } from "./types";

export const FileModel = model<IFileDocument>("file", FileSchema, "files");
