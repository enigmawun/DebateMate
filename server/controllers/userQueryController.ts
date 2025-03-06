import { Request, RequestHandler } from 'express';
import { ServerError } from '../../types/types';

export const parseUserQuery: RequestHandler = async (
  req: Request<unknown, unknown, Record<string, unknown>>,
  res,
  next
) => {
  console.log('BODY:', req.body);
  if (!req.body.topic || !req.body.user_side) {
    const error: ServerError = {
      log: 'Either the topic, user_side is missing from the request body',
      status: 400,
      message: { err: 'An error occurred while parsing the user query' },
    };
    return next(error);
  }

  const {
    user_arguments,
    ai_arguments,
    topic,
    user_side,
    round,
    ai_reasoning,
    ai_strong_points,
    ai_weak_points,
    user_strong_points,
    user_weak_points,
  } = req.body;
  console.log('ai_weak_points at parseUserQuery', ai_weak_points);

  // if (
  //   typeof topic !== 'string' ||
  //   typeof user_side !== 'string' ||
  //   typeof round !== 'number'
  // ) {
  //   const error: ServerError = {
  //     log: 'User query type is wrong',
  //     status: 400,
  //     message: { err: 'An error occurred while parsing the user query' },
  //   };
  //   return next(error);
  // }

  res.locals.aiArguments = ai_arguments;
  res.locals.userArguments = user_arguments;
  res.locals.topic = topic;
  res.locals.userSide = user_side;

  if (
    Array.isArray(ai_reasoning) &&
    Array.isArray(ai_strong_points) &&
    Array.isArray(ai_weak_points) &&
    Array.isArray(user_strong_points) &&
    Array.isArray(user_weak_points)
  ) {
    res.locals.aiReasonings = ai_reasoning;
    res.locals.aiStrongPoints = ai_strong_points;
    res.locals.aiWeakPoints = ai_weak_points;
    res.locals.userStrongPoints = user_strong_points;
    res.locals.userWeakPoints = user_weak_points;
  }
  console.log('User query parsed successfully');
  return next();
};
