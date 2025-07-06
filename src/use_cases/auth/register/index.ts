import { RegisterUserController } from "./controller";
import { RegisterUserUseCase } from "./usecase";

const registerUserUseCase = new RegisterUserUseCase();

export const registerUserController = new RegisterUserController(
  registerUserUseCase
);
