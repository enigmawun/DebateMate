import { RequestHandler } from 'express';
import { ServerError } from '../../types/types';
import 'dotenv/config';
import OpenAI from 'openai';

const openai = new OpenAI({
  organization: process.env.OPENAI_ORGANIZATION_ID,
  project: process.env.OPENAI_PROJECT_ID,
  apiKey: process.env.OPENAI_API_KEY2,
});

export const queryOpenAIArgument: RequestHandler = async (_req, res, next) => {
  const { systemContent, userArguments, userContent } = res.locals;

  if (!systemContent) {
    const error: ServerError = {
      log: 'queryOpenAIArgument did not receive system content ',
      status: 500,
      message: { err: 'An error occurred before querying OpenAI' },
    };
    return next(error);
  }

  try {
    console.log('Attempting OpenAI request with:', {
      systemContent,
      userContent,
    });

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: systemContent,
        },
        {
          role: 'user',
          content: JSON.stringify(userContent || []),
        },
      ],
      temperature: 0.7,
    });

    console.log('Raw OpenAI response:', response.choices[0].message.content);
    const argumentParams = JSON.parse(response.choices[0].message.content!);
    if (argumentParams) {
      res.locals.aiArgument = argumentParams.ai_argument;
      res.locals.aiReasoning = argumentParams.ai_reasoning;
      res.locals.aiStrongPoint = argumentParams.ai_strong_point;
      res.locals.aiWeakPoint = argumentParams.ai_weak_point;
      res.locals.userStrongPoint = argumentParams.user_strong_point;
      res.locals.userWeakPoint = argumentParams.user_weak_point;
      console.log('aiArgument: ', res.locals.aiArgument);
      console.log('sucessfully queried OpenAI for argument');
      return next();
    } else {
      const apiError: ServerError = {
        log: 'OpenAI did not return an argument',
        status: 500,
        message: {
          err: 'An error occurred while querying OpenAI within queryOpenAIArgument',
        },
      };
      return next(apiError);
    }
  } catch (err) {
    const apiError: ServerError = {
      log: 'queryOpenAIArgument: Error: OpenAI error' + err,
      status: 500,
      message: { err: 'An error occurred while querying OpenAI' },
    };
    return next(apiError);
  }
};

export const queryOpenAIEvaluation: RequestHandler = async (
  _req,
  res,
  next
) => {
  const { debateHistoryFeedback, systemEvaluationContent } = res.locals;

  if (!debateHistoryFeedback) {
    const error: ServerError = {
      log: 'queryOpenAIEvaluation did not receive debate history feedback ',
      status: 500,
      message: {
        err: 'An error occurred before querying OpenAI for evaluation',
      },
    };
    return next(error);
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: systemEvaluationContent,
        },
        {
          role: 'user',
          content: JSON.stringify(debateHistoryFeedback),
        },
      ],
      temperature: 0.7,
    });
    console.log('response: ', response.choices[0].message.content);
    const evaluationResult = JSON.parse(response.choices[0].message.content!);
    if (evaluationResult) {
      res.locals.evaluationResult = evaluationResult;
      console.log('debate assessment: ', res.locals.evaluationResult);
      console.log('sucessfully queried OpenAI for debate assessment');

      return next();
    } else {
      const apiError: ServerError = {
        log: 'OpenAI did not return an argument',
        status: 500,
        message: {
          err: 'An error occurred while querying OpenAI within queryOpenAIArgument',
        },
      };
      return next(apiError);
    }
  } catch (err) {
    const apiError: ServerError = {
      log: 'queryOpenAIArgument: Error: OpenAI error' + err,
      status: 500,
      message: { err: 'An error occurred while querying OpenAI' },
    };
    return next(apiError);
  }
};
