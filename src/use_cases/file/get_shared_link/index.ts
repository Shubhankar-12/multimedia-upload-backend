import { GetSharedFileController } from "./controller";
import { GetSharedFileUseCase } from "./usecase";

const getSharedFileUseCase = new GetSharedFileUseCase();
const getSharedFileController = new GetSharedFileController(
  getSharedFileUseCase
);

export { getSharedFileController };
