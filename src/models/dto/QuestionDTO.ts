class QuestionDTO {
  constructor(question: string, answers: string[]) {
    this.question = question;
    this.answers = answers;
  }

  question: string;
  answers: string[];
}

export default QuestionDTO;
