import { fileQueries } from "../../../db/queries";
import { ErrorResponse, ResponseLocalAuth } from "../../../types/all_types";
import { v4 as uuidv4 } from "uuid";

type UseCaseRequest = {
  fileId: string;
  auth: ResponseLocalAuth;
};

export class GenerateLinkUseCase {
  async execute({
    fileId,
    auth,
  }: UseCaseRequest): Promise<{ url: string } | ErrorResponse> {
    const userId = auth.decodedToken.user_id;

    const file = await fileQueries.getFileById(fileId);
    if (!file) return { error: "File not found" };

    if (file.user_id.toString() !== userId) {
      return { error: "Unauthorized. Only owner can generate link." };
    }

    const token = uuidv4();
    await fileQueries.setShareLinkToken(fileId, token);

    const baseUrl = process.env.LIVE_URL || "http://localhost:3000"; // Assuming frontend or API url
    // If it's API serving:
    const url = `${baseUrl}/api/shared/${token}`;

    return { url };
  }
}
