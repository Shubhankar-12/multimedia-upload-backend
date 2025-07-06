import { userQueries } from "../../../db/queries";

import { ErrorResponse } from "../../../types/all_types";
import { generateToken } from "../../../utils/general_utils";
import { LoginUserDto } from "./dto";
import bcrypt from "bcryptjs";

// response will have token and ngo data or error message

interface Response {
  token: string;
  user: {
    user_id: string;
    name: string;
    email: string;
  };
}

export class LoginUserUseCase {
  async execute(request: LoginUserDto): Promise<Response | ErrorResponse> {
    const existingUser = await userQueries.getUserByEmail(request.email);
    if (!existingUser) {
      return {
        error: "No user found with this email",
      };
    }
    const matchPassword = bcrypt.compareSync(
      request.password,
      existingUser.password
    );

    if (!matchPassword) {
      return {
        error: "Email or password is incorrect",
      };
    }

    const token = generateToken({
      user_id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
    });

    if (existingUser) {
      return {
        token: token,
        user: {
          user_id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
        },
      };
    }

    return {
      error: "Error creating ngo",
    };
  }
}
