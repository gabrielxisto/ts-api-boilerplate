import { Request, Response } from "express";
import { GetUserUseCase } from "./GetUserUseCase";

export class GetUserController {
  async handle(req: Request, res: Response) {
    const getUserUseCase = new GetUserUseCase();
  
    const data = {
      username: req.query.username as string
    }
    
    const result = await getUserUseCase.execute(data);

    return res.status(200).json(result)
  }
}
