import { BaseValidator } from "../../../helpers/BaseClasses/BaseValidator";
import { GetAllFileRequest } from "./request";

export class GetAllFileValidator extends BaseValidator {
  private request: GetAllFileRequest;
  constructor(request: GetAllFileRequest) {
    super();
    this.request = request;
  }

  parseRequest(): String[] {
    const errors: string[] = [];

    this.request.skip &&
      !this.validateNumber(this.request.skip) &&
      errors.push("Invalid skip format");

    this.request.limit &&
      !this.validateNumber(this.request.limit) &&
      errors.push("Invalid limit format");

    return errors;
  }
}
