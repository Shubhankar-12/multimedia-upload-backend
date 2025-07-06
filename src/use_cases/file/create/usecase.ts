import { Readable } from "stream";
import { IFile } from "../../../db/files";
import { fileQueries, userQueries } from "../../../db/queries";
import { ErrorResponse, ResponseLocalAuth } from "../../../types/all_types";
import cloudinary from "../../../utils/cloudinary";
import { CreateFileDto } from "./dto";

type UseCaseRequest = {
  request: CreateFileDto;
  auth: ResponseLocalAuth;
};

export class CreateFileUseCase {
  async execute({
    request,
    auth,
  }: UseCaseRequest): Promise<IFile | ErrorResponse> {
    const token = auth.token;
    if (!token) return { error: "Not authenticated" };

    const userId = auth.decodedToken.user_id;

    if (!request.buffer) return { error: "No file found" };
    if (request.size > 100_000_000)
      return { error: "File size should be less than 100MB" };

    // Convert buffer to stream and upload to Cloudinary
    const result = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      const stream = Readable.from(request.buffer);
      stream.pipe(uploadStream);
    });

    const newFile = {
      user_id: userId,
      name: request.originalname,
      url: result.secure_url,
      size: request.size,
      type: request.mimetype,
      tags: request.tags,
    };

    const resp = await fileQueries.createFile(newFile);

    if (resp)
      return {
        file_id: resp._id,
        name: resp.name,
        url: resp.url,
        size: resp.size,
        type: resp.type,
        tags: resp.tags,
        viewCount: resp.viewCount,
        created_at: resp.created_at,
        updated_at: resp.updated_at,
        user_id: resp.user_id,
      };

    return { error: "Error creating file" };
  }
}
