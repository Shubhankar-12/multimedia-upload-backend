import { GetAllFileRequest } from "./request";

export interface GetAllFileDto {
  skip?: number;
  limit?: number;
  search?: string;
  sort?: string;
  filter?: string;
}

export class GetAllFileDtoConverter {
  private output_object: GetAllFileDto;

  constructor(data: GetAllFileRequest) {
    this.output_object = {
      skip: data.skip ? Number(data.skip) : 0,
      search: data.search ? data.search : "",
      sort: data.sort ? data.sort : "",
      filter: data.filter ? data.filter : "",
    };
    if (data.limit) {
      this.output_object.limit = Number(data.limit);
    }
  }

  public getDtoObject(): GetAllFileDto {
    return this.output_object;
  }
}
