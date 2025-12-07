/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CreateFileRequest {
  files: Express.MulterS3.File[];
  tags: string;
}
