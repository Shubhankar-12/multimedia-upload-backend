import { fileQueries, userQueries } from "../../../db/queries";
import { ErrorResponse, ResponseLocalAuth } from "../../../types/all_types";

type UseCaseRequest = {
  request: {
    fileId: string;
    email: string;
  };
  auth: ResponseLocalAuth;
};

export class ShareFileUseCase {
  async execute({
    request,
    auth,
  }: UseCaseRequest): Promise<
    { success: boolean; message?: string } | ErrorResponse
  > {
    const userId = auth.decodedToken.user_id;

    const file = await fileQueries.getFileById(request.fileId);
    if (!file) return { error: "File not found" };

    if (file.user_id.toString() !== userId) {
      return { error: "Unauthorized. You are not the owner of this file." };
    }

    const targetUser = await userQueries.getUserByEmail(request.email);
    if (!targetUser) return { error: "User with this email not found" };

    try {
      await fileQueries.addSharedUser(request.fileId, targetUser._id);
      return { success: true, message: "File shared successfully" };
    } catch (err) {
      return { error: "Failed to share file" };
    }
  }
}
