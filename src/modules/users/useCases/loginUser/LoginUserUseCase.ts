import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";
import { UserDTO } from "../../dtos/UserDTO";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class LoginUserUseCase {
  async execute({ username, password }: UserDTO): Promise<string> {
    if (username && password) {

      const user = await prisma.user.findUnique({
        where: {
          username
        },
      });
      if (!user) throw new AppError("User not exists!", 400);

      const passwordValid = bcrypt.compare(user.password, password)
      if(!passwordValid) throw new AppError("Password is not valid!", 400);

      const token = jwt.sign({ userId: user.id }, process.env.JWT_TOKEN, { expiresIn: '1h' });
      
      return token
    }

    throw new AppError("Username or password is not declared!", 400);
  }
}
