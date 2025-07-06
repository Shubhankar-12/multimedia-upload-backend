import { RegisterUserRequest } from "./request";
import bcrypt from "bcryptjs";
export interface RegisterUserDto {
  name: string;
  email: string;
  password: string;
}

export class RegisterUserDtoConverter {
  private output_object: RegisterUserDto;

  constructor(data: RegisterUserRequest) {
    this.output_object = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    if (data.password)
      this.output_object.password = bcrypt.hashSync(data.password, 10);
  }

  public getDtoObject(): RegisterUserDto {
    return this.output_object;
  }
}
