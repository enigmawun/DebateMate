import { RequestHandler } from 'express';
import { ServerError } from '../../types/types';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

interface MovieLogEntry {
  movieRecommendation: string;
}

export const fetchLastResult: RequestHandler = async (_req, res, next) => {
  if (res.locals.hasBeenCalled) {
    // fetch the last query result from the loggin file
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const filePath = path.join(__dirname, '../log.json');

    try {
      const log = await fs.promises.readFile(filePath, 'utf-8');
      // console.log('usersjson', usersjson);
      const parsedLog = JSON.parse(log);
      // get the last n records from log
      const lastRecs = parsedLog
        .slice(-res.locals.numRecalled)
        .map((movieObj: MovieLogEntry) => {
          if (movieObj.movieRecommendation) return movieObj.movieRecommendation;
        });

      res.locals.lastRecommendation = lastRecs;
      // console.log('Previous:', lastRecs);
      return next();
    } catch (err) {
      const apiError: ServerError = {
        log: `logger: Error: fetching log failed ${err}`,
        status: 500,
        message: { err: 'An error occurred while fetching the log' },
      };
      return next(apiError);
    }
  } else {
    return next();
  }
};
