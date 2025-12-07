import { Schema, Types } from "mongoose";

export const FileSchema = new Schema(
  {
    user_id: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
    name: {
      type: String, // Display name
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    s3_key: {
      type: String,
      required: true,
    },
    url: {
      type: String, // Keeping mainly for legacy or direct access if public
    },
    size: {
      type: Number,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    type: {
      type: String, // Legacy support, can map to mimeType
    },
    tags: {
      type: [String],
    },
    shared_with: [
      {
        type: Types.ObjectId,
        ref: "user",
      },
    ],
    share_link_token: {
      type: String,
    },
    viewCount: { type: Number, default: 0 },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
