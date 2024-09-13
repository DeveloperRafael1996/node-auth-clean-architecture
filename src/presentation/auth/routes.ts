import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddelware } from "../middelwares/auth.midelware";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const database = new AuthDatasourceImpl();
    const authRepository = new AuthRepositoryImpl(database);
    const controller = new AuthController(authRepository);

    router.post("/login", controller.loginUser);
    router.post("/register", controller.registerUser);
    router.get("/", [AuthMiddelware.validateJWT], controller.getUser);


    return router;
  }
}
