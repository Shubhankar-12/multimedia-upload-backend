import jwt from "jsonwebtoken";
interface User {
  user_id: string;
  name: string;
  email: string;
}

export const generateToken = (user: User) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: "7d" });
};
