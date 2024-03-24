import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";
import { GetUsersDTO } from "../../dtos/GetUsersDTO";

export class GetUserUseCase {
  async execute({ username }: GetUsersDTO): Promise<User> {
    if (username) {

      const user = await prisma.user.findUnique({
        where: {
          username
        },
      });
  
      if (!user) {
        throw new AppError("User not exists!", 400);
      }
      
      return user
    }

    throw new AppError("Username is not declared!", 400);
  }
}
