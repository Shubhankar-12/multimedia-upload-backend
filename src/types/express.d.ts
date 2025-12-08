import { ResponseLocalAuth } from "./all_types";

declare global {
  namespace Express {
    interface Request {
      user?: any; // Using any for now as the user structure is dynamic/database dependent, ideally should be typed
    }
  }
}
