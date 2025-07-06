import { Request, Response } from "express";
import { RegisterUserDtoConverter } from "./dto";
import { RegisterUserUseCase } from "./usecase";
import { RegisterUserRequest } from "./request";
import { RegisterUserValidator } from "./validator";

export class RegisterUserController {
  private registerUserUseCase: RegisterUserUseCase;

  constructor(registerUserUseCase: RegisterUserUseCase) {
    this.registerUserUseCase = registerUserUseCase;
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const requestData = req.body as unknown as RegisterUserRequest;

      // Validate Request
      const validator = new RegisterUserValidator(requestData);
      const errors = validator.parseRequest();
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      // Convert DTO
      const dtoObject = new RegisterUserDtoConverter(requestData);

      // Execute Use Case
      const result = await this.registerUserUseCase.execute(
        dtoObject.getDtoObject()
      );

      if (typeof result === "object" && "error" in result) {
        res.status(400).json({ error: result.error });
        return;
      }

      res.status(200).json(result);
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: any): void {
    console.error("CreateNgoController Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

  execute() {
    return (req: Request, res: Response) => this.handle(req, res);
  }
}
