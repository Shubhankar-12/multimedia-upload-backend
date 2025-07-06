import { LoginUserRequest } from "./request";
import bcrypt from "bcryptjs";
export interface LoginUserDto {
  email: string;
  password: string;
}

export class LoginUserDtoConverter {
  private output_object: LoginUserDto;

  constructor(data: LoginUserRequest) {
    this.output_object = {
      email: data.email,
      password: data.password,
    };
  }

  public getDtoObject(): LoginUserDto {
    return this.output_object;
  }
}
