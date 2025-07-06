import { Readable } from "stream";
import { IFile } from "../../../db/files";
import { fileQueries, userQueries } from "../../../db/queries";
import { ErrorResponse, ResponseLocalAuth } from "../../../types/all_types";
import cloudinary from "../../../utils/cloudinary";
import { DeleteFileDto } from "./dto";

type UseCaseRequest = {
  request: DeleteFileDto;
  auth: ResponseLocalAuth;
};

type Response =
  | {
      message: string;
      file_id: string;
    }
  | ErrorResponse;

export class DeleteFileUseCase {
  async execute({ request, auth }: UseCaseRequest): Promise<Response> {
    const token = auth.token;
    if (!token) return { error: "Not authenticated" };

    const userId = auth.decodedToken.user_id;

    // Convert buffer to stream and upload to Cloudinary

    const resp = await fileQueries.deleteFile(request);

    if (resp)
      return {
        message: "File deleted successfully",
        file_id: request.file_id,
      };

    return { error: "Error creating file" };
  }
}
