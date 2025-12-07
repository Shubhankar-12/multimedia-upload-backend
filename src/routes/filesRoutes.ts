import express from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "../utils/s3";
import { authenticate } from "../helpers/AuthMiddleware";
import { canAccessFile } from "../helpers/PermissionMiddleware";
import { getAllFileController } from "../use_cases/file/get_all";
import { createFileController } from "../use_cases/file/create";
import { deleteFileController } from "../use_cases/file/delete";
import { updateViewCountController } from "../use_cases/file/update_view_count";
import { shareFileController } from "../use_cases/file/share";
import { generateLinkController } from "../use_cases/file/generate_link";

export const filesRouter = express.Router();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME || "default-bucket",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `uploads/${uniqueSuffix}-${file.originalname}`);
    },
  }),
  limits: { fileSize: 500 * 1024 * 1024 },
});

// Create/Upload (support bulk)
filesRouter.post(
  "/upload",
  authenticate,
  upload.array("documents", 10),
  createFileController.execute()
);

// Link Generation
filesRouter.post("/:id/link", authenticate, generateLinkController.execute());

// Share
filesRouter.post("/:id/share", authenticate, shareFileController.execute());

// Get All (should filter by user)
filesRouter.get("/", authenticate, getAllFileController.execute());

// Delete
filesRouter.delete("/delete", authenticate, deleteFileController.execute());

// Update view count
filesRouter.patch(
  "/update_view_count",
  authenticate,
  canAccessFile,
  updateViewCountController.execute()
);
