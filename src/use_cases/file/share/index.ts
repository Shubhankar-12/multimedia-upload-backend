import { ShareFileController } from "./controller";
import { ShareFileUseCase } from "./usecase";

const shareFileUseCase = new ShareFileUseCase();
const shareFileController = new ShareFileController(shareFileUseCase);

export { shareFileController };
