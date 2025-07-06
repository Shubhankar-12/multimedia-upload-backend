import { BaseValidator } from "../../../helpers/BaseClasses/BaseValidator";
import { CreateFileRequest } from "./request";

export class CreateFileValidator extends BaseValidator {
  private request: CreateFileRequest;
  constructor(request: CreateFileRequest) {
    super();
    this.request = request;
  }

  parseRequest(): String[] {
    const errors: string[] = [];

    return errors;
  }
}
