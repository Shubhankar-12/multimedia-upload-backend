import express from "express";
import { registerUserController } from "../use_cases/auth/register";
import { loginUserController } from "../use_cases/auth/login";
import { meController } from "../use_cases/auth/me";
import { authenticate } from "../helpers/AuthMiddleware";

export const authRouter = express.Router();

authRouter.post("/register", registerUserController.execute());
authRouter.post("/login", loginUserController.execute());
authRouter.get("/me", authenticate, meController.execute());
