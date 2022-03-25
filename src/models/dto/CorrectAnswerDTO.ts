class CorrectAnswerDTO {
  constructor(isCorrect: boolean, correctAnswer: string) {
    this.isCorrect = isCorrect;
    this.correctAnswer = correctAnswer;
  }

  isCorrect: boolean;
  correctAnswer: string;
}

export default CorrectAnswerDTO;
