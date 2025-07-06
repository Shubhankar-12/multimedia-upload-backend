import { ObjectId } from "mongodb";
export class BaseValidator {
  validateId(value: string): Boolean {
    if (value == undefined) {
      return false;
    } else if (typeof value !== "string") {
      return false;
    } else if (value.length === 0) {
      return false;
    } else if (!ObjectId.isValid(value)) {
      return false;
    } else {
      return true;
    }
  }

  validateStatus(value: string): Boolean {
    if (value == undefined) {
      return false;
    } else if (typeof value !== "string") {
      return false;
    } else if (value.length === 0) {
      return false;
    } else if (value !== "ENABLED" && value !== "DISABLED") {
      return false;
    } else {
      return true;
    }
  }
  validateEmail(value: string): Boolean {
    if (value == undefined) {
      return false;
    } else if (typeof value !== "string") {
      return false;
    } else if (value.length === 0) {
      return false;
    } else if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        value
      )
    ) {
      return false;
    }
    return true;
  }
  validatePassword(value: string): Boolean {
    if (value == undefined) {
      return false;
    } else if (typeof value !== "string") {
      return false;
    } else if (value.length === 0) {
      return false;
    } else if (value.length < 8) {
      return false;
    }
    return true;
  }

  validateNumber(value: any, min?: number, max?: number): Boolean {
    if (value == undefined) {
      return false;
    } else if (isNaN(Number(value))) {
      return false;
    } else if (min && value < min) {
      return false;
    } else if (max && value > max) {
      return false;
    }
    return true;
  }

  validateBoolean(value: any): Boolean {
    if (value == undefined) {
      return false;
    } else if (typeof value !== "boolean") {
      return false;
    }
    return true;
  }

  // validate month string format: "YYYY-MM"
  validateMonth(value: string): Boolean {
    if (value == undefined) {
      return false;
    } else if (typeof value !== "string") {
      return false;
    } else if (value.length !== 7) {
      return false;
    } else if (!/^\d{4}-\d{2}$/.test(value)) {
      return false;
    }
    return true;
  }

  validateEnum(value: string, enumValues: string[]): Boolean {
    if (value == undefined) {
      return false;
    } else if (typeof value !== "string") {
      return false;
    } else if (value.length === 0) {
      return false;
    } else if (!enumValues.includes(value)) {
      return false;
    } else {
      return true;
    }
  }
}
