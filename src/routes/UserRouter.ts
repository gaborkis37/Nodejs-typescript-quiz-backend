import { Router } from "express";
import UserController from "../controllers/UserController";

class UserRouter {
  userRoutes(): Router {
    const router = Router();

    router.get("", UserController.getUsers);
    router.post("", UserController.createUser);
    router.put("/:userId", UserController.addScore);

    return router;
  }
}

export default new UserRouter();
