import { LoginUserController } from "./controller";
import { LoginUserUseCase } from "./usecase";

const loginUserUseCase = new LoginUserUseCase();

export const loginUserController = new LoginUserController(loginUserUseCase);
