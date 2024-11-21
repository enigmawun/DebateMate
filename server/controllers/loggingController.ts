import { RequestHandler } from 'express';
import { ServerError } from '../../types/types';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

export const logDataDuringDebate: RequestHandler = async (_req, res, next) => {

  if (
    res.locals.aiArguments &&
    res.locals.userArguments &&
    res.locals.parsedArguments &&
    res.locals.topic &&
    res.locals.userSide &&
    res.locals.round &&
    res.locals.aiResponse
  ) {
   
    const loggingData = {
      "parsedArguments": res.locals.parsedArguments,
      "topic": res.locals.topic,
      "userSide": res.locals.userSide,
      "round": res.locals.round,
      "aiResponse": res.locals.aiResponse
    };

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
        message: { err: 'An error occurred while logging the data during the debate' },
      };
      return next(apiError);
    }
  } else {
    console.error('Error logging data to JSON file');
  }
};

export const logDataAfterDebate: RequestHandler = async (_req, res, next) => {

  if (
    res.locals.userQuery &&
    res.locals.pineconeQueryResult &&
    res.locals.movieRecommendation &&
    res.locals.startYear &&
    res.locals.endYear
  ) {
    const userQuery = res.locals.userQuery;

    const databaseQueryResult = res.locals.pineconeQueryResult.map(
      (movieObj) => {
        if (movieObj.metadata) {
          return {
            title: movieObj.metadata.title,
            year: movieObj.metadata.year,
            score: movieObj.score,
          };
        }
      }
    );
    // const movieRecommendation = res.locals.movieRecommendation;
    const movieRecommendation = JSON.parse(
      res.locals.movieRecommendation
    ).recommendation;
    const startYear = res.locals.startYear;
    const endYear = res.locals.endYear;

    const loggingData = {
      userQuery,
      startYear,
      endYear,
      databaseQueryResult,
      movieRecommendation,
    };

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const filePath = path.join(__dirname, '../log.json');

    try {
      let usersjson = await fs.promises.readFile(filePath, 'utf-8');
      // console.log('usersjson', usersjson);

      const users = JSON.parse(usersjson);
      users.push(loggingData);
      usersjson = JSON.stringify(users);
      await fs.promises.writeFile(filePath, usersjson, 'utf-8');

      return next();
    } catch (err) {
      const apiError: ServerError = {
        log: `logger: Error: logging failed ${err}`,
        status: 500,
        message: { err: 'An error occurred while logging the data' },
      };
      return next(apiError);
    }
  } else {
    console.error('Error logging movie to JSON file');
  }

};


