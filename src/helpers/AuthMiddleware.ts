import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { userQueries } from "../db/queries";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const user = await userQueries.getUserById(decoded.user_id);
    console.log("user", user);

    if (!user) {
      res
        .status(401)
        .json({ message: "Unauthorized Token found. Please login again." });
      return;
    }

    next();
  } catch {
    res.status(401).json({ message: "Invalid token, please login again" });
    return;
  }
};
