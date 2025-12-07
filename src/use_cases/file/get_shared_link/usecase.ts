import { fileQueries, activityQueries } from "../../../db/queries";
import { ErrorResponse, ResponseLocalAuth } from "../../../types/all_types";
import { IFile } from "../../../db/files";

type UseCaseRequest = {
  token: string;
  auth: ResponseLocalAuth;
};

export class GetSharedFileUseCase {
  async execute({
    token,
    auth,
  }: UseCaseRequest): Promise<IFile | ErrorResponse> {
    const userId = auth.decodedToken.user_id; // Verified by middleware/controller
    if (!userId) return { error: "User verification failed" };

    const file = await fileQueries.getFileByToken(token);

    if (!file) {
      return { error: "Invalid link or file not found" };
    }

    await fileQueries.updateViewCount({
      file_id: file._id,
    });

    // Log Activity
    await activityQueries.logActivity({
      user_id: userId,
      file_id: file._id,
      action: "VIEW",
      timestamp: new Date(),
    });

    return file;
  }
}
