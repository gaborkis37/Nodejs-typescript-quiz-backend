import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const newUser = await UserService.createUser(req.body.username);
      res.status(201).send(newUser);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getUsers();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async addScore(req: Request, res: Response) {
    try {
      const updatedUser = await UserService.addScoreToUser(
        req.params.userId,
        req.body.score
      );

      res.status(200).send(updatedUser);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export default new UserController();
