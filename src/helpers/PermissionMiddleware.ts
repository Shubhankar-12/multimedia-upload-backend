import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { fileQueries } from "../db/queries";

export const canAccessFile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const fileId =
      req.params.id ||
      req.body.fileId ||
      req.body.file_id ||
      (req.query.fileId as string) ||
      (req.query.file_id as string);
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const userId = decoded.user_id;

    if (!fileId) {
      // If no fileId in params (might be create route?), skip or error.
      // Assuming this is applied to routes with :id
      res.status(400).json({ message: "File ID required" });
      return;
    }

    const file = await fileQueries.getFileById(fileId);
    if (!file) {
      res.status(404).json({ message: "File not found" });
      return;
    }

    const isOwner = file.user_id.toString() === userId;
    const isShared =
      file.shared_with &&
      file.shared_with.some((id: any) => id.toString() === userId);

    if (isOwner || isShared) {
      next();
      return;
    }

    res.status(403).json({ message: "Access denied" });
    return;
  } catch (error) {
    console.error("Permission check error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error during permission check" });
    return;
  }
};
