import express from 'express';
import { parseUserQuery } from '../controllers/userQueryController';
import {
  queryOpenAIEmbedding,
  queryOpenAIChat,
} from '../controllers/openaiController';
import { queryPineconeDatabase } from '../controllers/pineconeController';

const router = express.Router();

router.post(
  '/',
  parseUserQuery,
  queryOpenAIEmbedding,
  queryPineconeDatabase,
  queryOpenAIChat,
  (_req, res) => {
    res
      .status(200)
      .json({ movieRecommendation: res.locals.movieRecommendation });
  }
);

export default router;
