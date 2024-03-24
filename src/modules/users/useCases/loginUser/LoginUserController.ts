import { Request, Response } from "express";
import { LoginUserUseCase } from "./LoginUserUseCase";

export class LoginUserController {
  async handle(req: Request, res: Response) {
    const loginUserUseCase = new LoginUserUseCase();

    const result = await loginUserUseCase.execute(req.body);

    return res.status(200).cookie('ts-api-token', result, { maxAge: (60 * 60) * 1000 }).send({ success: true })
  }
}
