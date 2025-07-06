/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CreateFileRequest {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
  tags: string;
}
