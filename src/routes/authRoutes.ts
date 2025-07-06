import express from "express";
import { registerUserController } from "../use_cases/auth/register";
import { loginUserController } from "../use_cases/auth/login";
export const authRouter = express.Router();

authRouter.post("/register", registerUserController.execute());
authRouter.post("/login", loginUserController.execute());
