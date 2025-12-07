import { Request, Response } from "express";
import { ShareFileUseCase } from "./usecase";
import jwt from "jsonwebtoken";
import { ResponseLocalAuth } from "../../../types/all_types";

export class ShareFileController {
  private shareFile: ShareFileUseCase;

  constructor(shareFile: ShareFileUseCase) {
    this.shareFile = shareFile;
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const fileId = id;
      const { email } = req.body;

      if (!fileId || !email) {
        res.status(400).json({ error: "Missing fileId or email" });
        return;
      }

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

      const result = await this.shareFile.execute({
        request: { fileId, email },
        auth,
      });

      if (typeof result === "object" && "error" in result) {
        res.status(400).json({ error: result.error });
        return;
      }

      res.status(200).json(result);
    } catch (error: any) {
      console.error("ShareFileController Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  execute() {
    return (req: Request, res: Response) => this.handle(req, res);
  }
}
