import express from "express";
import { authRouter } from "./authRoutes";
import { filesRouter } from "./filesRoutes";
import { sharedRouter } from "./sharedRoutes";

const apiRouter = express.Router();
apiRouter.use("/auth", authRouter);
apiRouter.use("/files", filesRouter);
apiRouter.use("/shared", sharedRouter);

export { apiRouter };
