import { Request, Response } from "express";
import { Difficulty } from "../models/Difficulty";
import QuizService from "../services/QuizService";
import UserService from "../services/UserService";

class QuizController {
  async getQuestions(req: Request, res: Response) {
    try {
      const questions = await QuizService.getQuestionsForUser(
        Number(req.params.amount),
        Difficulty[
          req.params.difficulty.toUpperCase() as keyof typeof Difficulty
        ],
        req.params.userId
      );
      res.status(200).send(questions);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async checkAnswer(req: Request, res: Response) {
    try {
      const response = await QuizService.checkAnswer(
        req.body.userId,
        req.body.answer,
        req.body.question
      );

      res.status(200).send(response);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async deleteQuestionsOfUser(req: Request, res: Response) {
    try {
      await QuizService.deleteQuestionsOfUser(req.params.userId);
      res.status(200).send("Questions deleted successfully");
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export default new QuizController();
