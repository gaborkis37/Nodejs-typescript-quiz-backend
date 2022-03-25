import axios from "axios";
import { Difficulty } from "../models/Difficulty";
import CorrectAnswerDTO from "../models/dto/CorrectAnswerDTO";
import QuestionDTO from "../models/dto/QuestionDTO";
import { IQuizQuestion, QuizQuestion } from "../models/QuizQuestions";
import { shuffleArray } from "../util/Util";

class QuizService {
  async getQuestionsForUser(
    amount: number,
    difficulty: Difficulty,
    userId: string
  ) {
    try {
      const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
      const response = await axios.get(endpoint);
      const data: IQuizQuestion[] = response.data.results;

      data.map(async (quizData) => {
        const newQuizQuestion = new QuizQuestion(quizData);
        newQuizQuestion.user = userId;

        await newQuizQuestion.save();
      });

      return data.map(
        (question) =>
          new QuestionDTO(
            question.question,
            shuffleArray([
              ...question.incorrect_answers,
              question.correct_answer,
            ])
          )
      );
    } catch (error) {
      console.log(error);
    }
  }

  async checkAnswer(userId: string, answer: string, question: string) {
    try {
      const currentQuestion: IQuizQuestion | null = await QuizQuestion.findOne({
        user: userId,
        question,
      });

      if (!currentQuestion) {
        throw new Error("No question found");
      }

      const isCorrect = currentQuestion.correct_answer === answer;

      return new CorrectAnswerDTO(isCorrect, currentQuestion.correct_answer);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteQuestionsOfUser(userId: string) {
    await QuizQuestion.deleteMany({ user: userId });
  }
}

export default new QuizService();
