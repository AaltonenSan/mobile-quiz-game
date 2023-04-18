export interface OpenTDBResponse {
  response_code: number;
  results: Result[];
}

export interface Result {
  category: string;
  type: 'boolean' | 'multiple';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}