import { RequestHandler } from 'express';
import { ServerError } from '../../types/types';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

export const logDataDuringDebate: RequestHandler = async (_req, res, next) => {
  console.log('Beginning the logging process...');
  if (
    res.locals.aiArgument &&
    // res.locals.userArguments &&
    // res.locals.parsedArguments &&
    res.locals.topic &&
    res.locals.userSide &&
    res.locals.round
  ) {
    console.log('Logging Data...');
    const loggingData = {
      "debate topic": res.locals.parsedTopic,
      "user's side": res.locals.userSide,
      "round number": res.locals.round,
      "past debate": res.locals.parsedArguments,
      "new argument by ai": res.locals.aiArgument,
      "ai's reasoning of this argument": res.locals.aiReasoning,
      "ai's weak point of this argument": res.locals.aiStrongPoint,
      "ai's strong point of this argument": res.locals.aiWeakPoint,
      "user's strong point of last argument ": res.locals.userStrongPoint,
      "user's weak point of last argument": res.locals.userWeakPoint,
    };
    console.log('loggingData: ', loggingData);
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const filePath = path.join(__dirname, '../log.json');

    try {
      let log = await fs.promises.readFile(filePath, 'utf-8');
      // console.log('usersjson', usersjson);

      const parsedLog = JSON.parse(log);
      parsedLog.push(loggingData);
      log = JSON.stringify(parsedLog);
      await fs.promises.writeFile(filePath, log, 'utf-8');

      return next();
    } catch (err) {
      const apiError: ServerError = {
        log: `logger: Error: logging failed ${err}`,
        status: 500,
        message: {
          err: 'An error occurred while logging the data during the debate',
        },
      };
      return next(apiError);
    }
  } else {
    console.log('logger: did not enter the if statement');
    console.error('Error logging data to JSON file');
  }
};

export const logDataAfterDebate: RequestHandler = async (_req, res, next) => {
  return next();
};
