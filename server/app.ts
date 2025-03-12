import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseUserQuery } from './controllers/userQueryController.js';
import {
  queryOpenAIArgument,
  queryOpenAIEvaluation,
} from './controllers/openaiController.js';
import {
  logDataAfterDebate,
  logDataDuringDebate,
} from './controllers/loggingController.js';
import {
  customizePrompts,
  parseArguments,
  parseTopic,
  parseDebateHistoryFeedback,
  customizeEvaluationPrompts,
} from './controllers/promptController.js';

import { ServerError } from '../types/types.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:8080',
    ], // Allow both ports
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, '../dist')));

app.post(
  '/api/ai/argument',
  parseUserQuery,
  parseArguments,
  parseTopic,
  customizePrompts,
  queryOpenAIArgument,
  // logDataDuringDebate,
  (_req, res) => {
    res.status(200).json({
      ai_argument: res.locals.aiArgument,
      ai_reasoning: res.locals.aiReasoning,
      ai_strong_point: res.locals.aiStrongPoint,
      ai_weak_point: res.locals.aiWeakPoint,
      user_strong_point: res.locals.userStrongPoint,
      user_weak_point: res.locals.userWeakPoint,
    });
  }
);

app.post(
  '/api/ai/assessment',
  parseUserQuery,
  parseTopic,
  parseDebateHistoryFeedback,
  customizeEvaluationPrompts,
  queryOpenAIEvaluation,
  // logDataAfterDebate,
  (_req, res) => {
    res.status(200).json(res.locals.evaluationResult);
  }
);

// Serve index.html for all other routes to support client-side routing
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const errorHandler: ErrorRequestHandler = (
  err: ServerError,
  _req,
  res,
  _next
) => {
  const defaultErr: ServerError = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj: ServerError = { ...defaultErr, ...err };
  console.log(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
};

app.use(errorHandler);

export default app;
