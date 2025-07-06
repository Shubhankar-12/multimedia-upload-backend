import { IFile } from "../../../db/files";
import { fileQueries } from "../../../db/queries";
import { ErrorResponse, ResponseLocalAuth } from "../../../types/all_types";
import { GetAllFileDto } from "./dto";

// response will have token and file data or error message
type UseCaseRequest = {
  request: GetAllFileDto;
  auth: ResponseLocalAuth;
};
export class GetAllFileUseCase {
  async execute({ request, auth }: UseCaseRequest): Promise<any> {
    if (!auth.token) {
      return [];
    }

    if (!auth.decodedToken.user_id) {
      return [];
    }

    const file = await fileQueries.getAllFiles({
      ...request,
      user_id: auth.decodedToken.user_id,
    });

    if (file[0].paginatedResults.length == 0) {
      file[0].totalCount.push({ count: 0 });
    }

    return file[0];
  }
}
