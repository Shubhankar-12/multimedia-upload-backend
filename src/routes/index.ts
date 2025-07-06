import express from "express";
import { authRouter } from "./authRoutes";
import { filesRouter } from "./filesRoutes";

const apiRouter = express.Router();
apiRouter.use("/auth", authRouter);
apiRouter.use("/files", filesRouter);

export { apiRouter };
