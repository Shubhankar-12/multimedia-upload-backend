import express from "express";
import { authenticate } from "../helpers/AuthMiddleware";
import { getSharedFileController } from "../use_cases/file/get_shared_link";

export const sharedRouter = express.Router();

sharedRouter.get("/:token", authenticate, getSharedFileController.execute());
