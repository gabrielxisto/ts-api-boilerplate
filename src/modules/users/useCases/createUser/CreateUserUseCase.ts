import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";
import { UserDTO } from "../../dtos/UserDTO";
import bcrypt from 'bcrypt';

export class CreateUserUseCase {
  async execute({ username, password }: UserDTO): Promise<User> {
    if (username && password) {

      const user = await prisma.user.findUnique({
        where: {
          username
        },
      });
  
      if (user) {
        throw new AppError("Existing user!", 400);
      }
      

      const salts = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salts)
      const newUser = prisma.user.create({
        data: {
          username,
          password: hashPassword
        }
      })

      return newUser
    }

    throw new AppError("Username or password is not declared!", 400);
  }
}
