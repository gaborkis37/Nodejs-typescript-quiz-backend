import { Schema, model, Model, Document } from "mongoose";

export interface IQuizQuestion extends Document {
  category: string;
  type: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  user?: string;
}

const QuizQuestionSchema: Schema = new Schema({
  category: { type: String, required: true },
  type: { type: String, required: true },
  question: { type: String, required: true },
  correct_answer: { type: String, required: true },
  incorrect_answers: { type: Array, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
});

export const QuizQuestion: Model<IQuizQuestion> = model(
  "QuizQuestion",
  QuizQuestionSchema
);
