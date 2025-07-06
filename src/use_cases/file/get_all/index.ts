import { GetAllFileController } from "./controller";
import { GetAllFileUseCase } from "./usecase";

const getAllFileUseCase = new GetAllFileUseCase();

export const getAllFileController = new GetAllFileController(getAllFileUseCase);
