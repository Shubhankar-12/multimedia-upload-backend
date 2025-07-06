import { BaseValidator } from "../../../helpers/BaseClasses/BaseValidator";
import { UpdateViewCountRequest } from "./request";

export class UpdateViewCountValidator extends BaseValidator {
  private request: UpdateViewCountRequest;
  constructor(request: UpdateViewCountRequest) {
    super();
    this.request = request;
  }

  parseRequest(): String[] {
    const errors: string[] = [];

    return errors;
  }
}
