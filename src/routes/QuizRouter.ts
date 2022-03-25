import { Router } from "express";
import QuizController from "../controllers/QuizController";

class QuizRouter {
  quizRoutes(): Router {
    const router = Router();

    router.get(
      "/questions/user/:userId/amount/:amount/difficulty/:difficulty",
      QuizController.getQuestions
    );

    router.post("/questions/check", QuizController.checkAnswer);
    router.delete("/questions/:userId", QuizController.deleteQuestionsOfUser);

    return router;
  }
}

export default new QuizRouter();
