import { CreateFileRequest } from "./request";

export interface FileData {
  originalname: string;
  mimetype: string;
  size: number;
  key: string;
  location: string;
}

export interface CreateFileDto {
  files: FileData[];
  tags: string[];
}

export class CreateFileDtoConverter {
  private output_object: CreateFileDto;

  constructor(data: CreateFileRequest) {
    this.output_object = {
      files: data.files.map((f) => ({
        originalname: f.originalname,
        mimetype: f.mimetype,
        size: f.size,
        key: f.key,
        location: f.location,
      })),
      tags: data.tags
        ? Array.isArray(data.tags)
          ? data.tags
          : JSON.parse(data.tags)
        : [],
    };
  }

  public getDtoObject(): CreateFileDto {
    return this.output_object;
  }
}
