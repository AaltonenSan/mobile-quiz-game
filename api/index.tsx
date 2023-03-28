import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { getQuestions, CategoryNames, QuestionDifficulties, QuestionTypes } from 'open-trivia-db';
const cors = require('cors');
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/questions', async (req: Request, res: Response) => {
  console.log('GET questions')
  const questions = await getQuestions({
    amount: 10,
    category: CategoryNames.Sports,
    difficulty: QuestionDifficulties.Easy,
    type: QuestionTypes.Multiple
  })
  res.status(200).json(questions)
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
