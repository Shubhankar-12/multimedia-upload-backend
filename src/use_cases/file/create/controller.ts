import { Request, Response } from "express";
import { CreateFileDtoConverter } from "./dto";
import { CreateFileUseCase } from "./usecase";
import { CreateFileRequest } from "./request";
import { CreateFileValidator } from "./validator";
import { ResponseLocalAuth } from "../../../types/all_types";
import jwt from "jsonwebtoken";

export class CreateFileController {
  private createFile: CreateFileUseCase;

  constructor(createFile: CreateFileUseCase) {
    this.createFile = createFile;
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const requestData: CreateFileRequest = {
        ...req.body,
        ...req.file,
      };
      console.log("requestData", req.body.tags);

      // Validate Request
      const validator = new CreateFileValidator(requestData);
      const errors = validator.parseRequest();
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      // Convert DTO
      const dtoObject = new CreateFileDtoConverter(requestData);
      const token =
        req.headers.authorization && req.headers.authorization.split(" ")[1];

      if (!token) {
        res.status(400).json({ error: "Token not found" });
        return;
      }

      const auth: ResponseLocalAuth = {
        token: token || "",
        decodedToken: jwt.decode(token || "") as any,
      };

      // Execute Use Case
      const result = await this.createFile.execute({
        request: dtoObject.getDtoObject(),
        auth: auth,
      });

      if (typeof result === "object" && "error" in result) {
        res.status(400).json({ error: result.error });
        return;
      }

      res.status(200).json(result);
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: any): void {
    console.error("CreateFileController Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

  execute() {
    return (req: Request, res: Response) => this.handle(req, res);
  }
}
