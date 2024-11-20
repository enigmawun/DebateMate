import { RequestHandler } from 'express';
import { ServerError } from '../../types/types';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

export const logTheData: RequestHandler = async (_req, res, next) => {
  //   if (res.locals.pineconeQueryResult) {
  //     const databaseQueryResult = res.locals.pineconeQueryResult.map((movieObj) => {
  //         return {title: movieObj.metadata.title, score: movieObj.score};
  //       });
  //   }

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

  //   try {
  //     await fs.appendFile(filePath, JSON.stringify(loggingData), () => {});

  //     console.log('Data appended successfully.');
  //     return next();
  //   } catch (err) {
  //     const apiError: ServerError = {
  //       log: `logger: Error: logging failed`,
  //       status: 500,
  //       message: { err: 'An error occurred while logging the data' },
  //     };
  //     return next(apiError);
  //   }
};

// read and write a .json file
// const fs = require("fs");
// let usersjson = fs.readFileSync("users.json","utf-8");

// transform a json string into a javascript array
// let users = JSON.parse(usersjson);

// append an object to an array
// users.push(obj);

// transform back the array into a json string
// usersjson = JSON.stringify(users);

// save the json file
// fs.writeFileSync("users.json",usersjson,"utf-8");
