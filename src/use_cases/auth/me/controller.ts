import { Request, Response } from "express";

export class MeController {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Not authenticated" });
        return;
      }
      res.status(200).json(req.user);
    } catch (error: any) {
      console.error("MeController Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  execute() {
    return (req: Request, res: Response) => this.handle(req, res);
  }
}
