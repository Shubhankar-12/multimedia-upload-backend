import { UpdateViewCountController } from "./controller";
import { UpdateViewCountUseCase } from "./usecase";

const updateViewCountUseCase = new UpdateViewCountUseCase();

export const updateViewCountController = new UpdateViewCountController(
  updateViewCountUseCase
);
