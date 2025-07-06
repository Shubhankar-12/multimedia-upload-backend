import { BaseValidator } from "../../../helpers/BaseClasses/BaseValidator";
import { LoginUserRequest } from "./request";

export class LoginUserValidator extends BaseValidator {
  private request: LoginUserRequest;
  constructor(request: LoginUserRequest) {
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
