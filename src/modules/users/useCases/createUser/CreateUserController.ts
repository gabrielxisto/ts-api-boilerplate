import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const createUserUseCase = new CreateUserUseCase();

    const result = await createUserUseCase.execute(req.body);

    return res.status(200).json(result)
  }
}
