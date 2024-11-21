import { Request, RequestHandler } from 'express';
import { ServerError } from '../../types/types';

export const parseUserQuery: RequestHandler = async (
  req: Request<unknown, unknown, Record<string, unknown>>,
  res,
  next
) => {
  if (!req.body.topic || !req.body.user_side || !req.body.round) {
    const error: ServerError = {
      log: 'Either the topic, user_side or round is missing from the request body',
      status: 400,
      message: { err: 'An error occurred while parsing the user query' },
    };
    return next(error);
  }

  const { user_arguments, ai_arguments, topic, user_side, round } = req.body;

  if (typeof topic !== 'string' || typeof user_side !== 'string' || typeof round !== 'number') {
    const error: ServerError = {
      log: 'User query type is wrong',
      status: 400,
      message: { err: 'An error occurred while parsing the user query' },
    };
    return next(error);
  }

  res.locals.aiArguments = ai_arguments;
  res.locals.userArguments = user_arguments;
  res.locals.topic = topic;
  res.locals.userSide = user_side;
  res.locals.round = round;
  
  return next();
};
