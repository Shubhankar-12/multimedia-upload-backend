import { GenerateLinkController } from "./controller";
import { GenerateLinkUseCase } from "./usecase";

const generateLinkUseCase = new GenerateLinkUseCase();
const generateLinkController = new GenerateLinkController(generateLinkUseCase);

export { generateLinkController };
