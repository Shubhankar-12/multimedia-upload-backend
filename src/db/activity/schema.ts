import { Schema, Types } from "mongoose";

export const FileActivitySchema = new Schema(
  {
    user_id: { type: Types.ObjectId, required: true, ref: "user" },
    file_id: { type: Types.ObjectId, required: true, ref: "file" },
    action: { type: String, required: true }, // VIEW, DOWNLOAD
    timestamp: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);
