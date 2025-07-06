import { DeleteFileRequest } from "./request";
export interface DeleteFileDto {
  file_id: string;
}

export class DeleteFileDtoConverter {
  private output_object: DeleteFileDto;

  constructor(data: DeleteFileRequest) {
    this.output_object = {
      file_id: data.file_id,
    };
  }

  public getDtoObject(): DeleteFileDto {
    return this.output_object;
  }
}
