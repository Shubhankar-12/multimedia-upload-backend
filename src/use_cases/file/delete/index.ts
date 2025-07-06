import { DeleteFileController } from "./controller";
import { DeleteFileUseCase } from "./usecase";

const deleteFileUseCase = new DeleteFileUseCase();

export const deleteFileController = new DeleteFileController(deleteFileUseCase);
