import { BaseValidator } from "../../../helpers/BaseClasses/BaseValidator";
import { RegisterUserRequest } from "./request";

export class RegisterUserValidator extends BaseValidator {
  private request: RegisterUserRequest;
  constructor(request: RegisterUserRequest) {
    super();
    this.request = request;
  }

  parseRequest(): String[] {
    const errors: string[] = [];

    !this.validateEmail(this.request.email) &&
      errors.push("Invalid email format");

    !this.validatePassword(this.request.password) &&
      errors.push("Invalid password format");

    return errors;
  }
}
