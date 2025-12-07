import { IFile } from "../../../db/files";
import { fileQueries, userQueries } from "../../../db/queries";
import { ErrorResponse, ResponseLocalAuth } from "../../../types/all_types";
import { CreateFileDto } from "./dto";
import { v4 as uuidv4 } from "uuid";

type UseCaseRequest = {
  request: CreateFileDto;
  auth: ResponseLocalAuth;
};

export class CreateFileUseCase {
  async execute({
    request,
    auth,
  }: UseCaseRequest): Promise<IFile[] | ErrorResponse> {
    const token = auth.token;
    if (!token) return { error: "Not authenticated" };

    const userId = auth.decodedToken.user_id;

    if (!request.files || request.files.length === 0)
      return { error: "No files found" };

    const createdFiles: IFile[] = [];

    for (const file of request.files) {
      const newFile = {
        user_id: userId,
        name: file.originalname,
        originalName: file.originalname, // Required by new schema
        s3_key: file.key, // Required by new schema
        mimeType: file.mimetype, // Required by new schema
        url: file.location,
        size: file.size,
        type: file.mimetype, // Legacy
        tags: request.tags,
        shared_with: [],
        share_link_token: uuidv4(),
      };

      const resp = await fileQueries.createFile(newFile);
      if (resp) {
        createdFiles.push(resp);
      }
    }

    return createdFiles;
  }
}
