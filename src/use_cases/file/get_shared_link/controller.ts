import { Request, Response } from "express";
import { GetSharedFileUseCase } from "./usecase";
import jwt from "jsonwebtoken";
import { ResponseLocalAuth } from "../../../types/all_types";

export class GetSharedFileController {
  private useCase: GetSharedFileUseCase;

  constructor(useCase: GetSharedFileUseCase) {
    this.useCase = useCase;
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { token: tokenParam } = req.params;

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

      const result = await this.useCase.execute({
        token: tokenParam,
        auth,
      });

      if (typeof result === "object" && "error" in result) {
        res.status(400).json({ error: result.error });
        return;
      }

      res.status(200).json(result);
    } catch (error: any) {
      console.error("GetSharedFileController Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  execute() {
    return (req: Request, res: Response) => this.handle(req, res);
  }
}
