import { Request, Response } from "express";
import { UpdateViewCountDtoConverter } from "./dto";
import { UpdateViewCountUseCase } from "./usecase";
import { UpdateViewCountRequest } from "./request";
import { UpdateViewCountValidator } from "./validator";
import { ResponseLocalAuth } from "../../../types/all_types";
import jwt from "jsonwebtoken";

export class UpdateViewCountController {
  private updateViewCount: UpdateViewCountUseCase;

  constructor(updateViewCount: UpdateViewCountUseCase) {
    this.updateViewCount = updateViewCount;
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const requestData = req.query as unknown as UpdateViewCountRequest;

      // Validate Request
      const validator = new UpdateViewCountValidator(requestData);
      const errors = validator.parseRequest();
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      // Convert DTO
      const dtoObject = new UpdateViewCountDtoConverter(requestData);
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
      const result = await this.updateViewCount.execute({
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
    console.error("UpdateViewCountController Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

  execute() {
    return (req: Request, res: Response) => this.handle(req, res);
  }
}
