import { BaseValidator } from "../../../helpers/BaseClasses/BaseValidator";
import { DeleteFileRequest } from "./request";

export class DeleteFileValidator extends BaseValidator {
  private request: DeleteFileRequest;
  constructor(request: DeleteFileRequest) {
    super();
    this.request = request;
  }

  parseRequest(): String[] {
    const errors: string[] = [];

    return errors;
  }
}
