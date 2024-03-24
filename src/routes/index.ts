import { Router } from "express";

import { UserRoutes } from "./user.routes";

const Routes = Router();

Routes.use("/users", UserRoutes);

export { Routes };
