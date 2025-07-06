import { userQueries } from "../../../db/queries";
import { ErrorResponse } from "../../../types/all_types";
import { generateToken } from "../../../utils/general_utils";
import { RegisterUserDto } from "./dto";

// response will have token and ngo data or error message

interface Response {
  token: string;
  user: {
    user_id: string;
    name: string;
    email: string;
  };
}

export class RegisterUserUseCase {
  async execute(request: RegisterUserDto): Promise<Response | ErrorResponse> {
    const existingNgo = await userQueries.getUserByEmail(request.email);
    if (existingNgo) {
      return {
        error: "User already exists with this email",
      };
    }
    const newUser = await userQueries.createUser(request);

    if (!newUser) {
      return {
        error: "Error creating user",
      };
    }

    const token = generateToken({
      user_id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    });

    if (newUser) {
      return {
        token: token,
        user: {
          user_id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      };
    }

    return {
      error: "Error creating ngo",
    };
  }
}
