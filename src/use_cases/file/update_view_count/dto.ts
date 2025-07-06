import { UpdateViewCountRequest } from "./request";
export interface UpdateViewCountDto {
  file_id: string;
}

export class UpdateViewCountDtoConverter {
  private output_object: UpdateViewCountDto;

  constructor(data: UpdateViewCountRequest) {
    this.output_object = {
      file_id: data.file_id,
    };
  }

  public getDtoObject(): UpdateViewCountDto {
    return this.output_object;
  }
}
