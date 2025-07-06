import { Request, Response } from "express";
import { LoginUserDtoConverter } from "./dto";
import { LoginUserUseCase } from "./usecase";
import { LoginUserRequest } from "./request";
import { LoginUserValidator } from "./validator";

export class LoginUserController {
  private loginUserUseCase: LoginUserUseCase;

  constructor(loginUserUseCase: LoginUserUseCase) {
    this.loginUserUseCase = loginUserUseCase;
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const requestData = req.body as unknown as LoginUserRequest;

      // Validate Request
      const validator = new LoginUserValidator(requestData);
      const errors = validator.parseRequest();
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      // Convert DTO
      const dtoObject = new LoginUserDtoConverter(requestData);

      // Execute Use Case
      const result = await this.loginUserUseCase.execute(
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
