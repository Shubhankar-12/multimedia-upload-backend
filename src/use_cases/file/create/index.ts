import { CreateFileController } from "./controller";
import { CreateFileUseCase } from "./usecase";

const createFileUseCase = new CreateFileUseCase();

export const createFileController = new CreateFileController(createFileUseCase);
