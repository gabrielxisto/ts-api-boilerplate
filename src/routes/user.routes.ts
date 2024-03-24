import { Router } from "express";
import { GetUserController } from "../modules/users/useCases/getUser/GetUserController";
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";
import { LoginUserController } from '../modules/users/useCases/loginUser/LoginUserController';

const getUserController = new GetUserController();
const createUserController = new CreateUserController();
const loginUserController = new LoginUserController();

const UserRoutes = Router();

UserRoutes.get("/data", getUserController.handle);
UserRoutes.post("/create", createUserController.handle);
UserRoutes.post("/login", loginUserController.handle);

export { UserRoutes };
