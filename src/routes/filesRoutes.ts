import express from "express";
import multer from "multer";
import { authenticate } from "../helpers/AuthMiddleware";
import { getAllFileController } from "../use_cases/file/get_all";
import { createFileController } from "../use_cases/file/create";
import { deleteFileController } from "../use_cases/file/delete";
import { updateViewCountController } from "../use_cases/file/update_view_count";

export const filesRouter = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

filesRouter.get("/", authenticate, getAllFileController.execute());
filesRouter.post(
  "/upload",
  authenticate,
  upload.single("document"),
  createFileController.execute()
);

filesRouter.delete("/delete", authenticate, deleteFileController.execute());

filesRouter.patch(
  "/update_view_count",
  authenticate,
  updateViewCountController.execute()
);
