import { BaseValidator } from "../../../helpers/BaseClasses/BaseValidator";
import { GetAllFileRequest } from "./request";

const SortEnum = ["created_at", "viewCount", "size"];
const FilterEnum = ["audio", "image", "pdf", "video", "all"];

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

    this.request.sort &&
      !this.validateEnum(this.request.sort, SortEnum) &&
      errors.push(
        "Invalid sort format. Available options: " + SortEnum.join(", ")
      );

    this.request.filter &&
      !this.validateEnum(this.request.filter, FilterEnum) &&
      errors.push(
        "Invalid filter format. Available options: " + FilterEnum.join(", ")
      );

    return errors;
  }
}
