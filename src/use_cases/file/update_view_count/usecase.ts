import { fileQueries, activityQueries } from "../../../db/queries";
import { ErrorResponse, ResponseLocalAuth } from "../../../types/all_types";
import { UpdateViewCountDto } from "./dto";

type UseCaseRequest = {
  request: UpdateViewCountDto;
  auth: ResponseLocalAuth;
};

type Response =
  | {
      message: string;
      file_id: string;
    }
  | ErrorResponse;

export class UpdateViewCountUseCase {
  async execute({ request, auth }: UseCaseRequest): Promise<Response> {
    const token = auth.token;
    if (!token) return { error: "Not authenticated" };

    const userId = auth.decodedToken.user_id;

    const resp = await fileQueries.updateViewCount(request);

    if (resp.modifiedCount > 0 || resp.matchedCount > 0) {
      // Log Activity
      await activityQueries.logActivity({
        user_id: userId,
        file_id: request.file_id,
        action: "VIEW",
        timestamp: new Date(),
      });

      return {
        message: "View count updated successfully",
        file_id: request.file_id,
      };
    }

    return { error: "Error updating view count" };
  }
}
