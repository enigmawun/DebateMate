import { RequestHandler } from 'express';
import { ServerError } from '../../types/types';
import 'dotenv/config';
import OpenAI from 'openai';
import 'dotenv/config';
// import { Completions } from 'openai/resources/chat/completions.mjs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const queryOpenAIArgument: RequestHandler = async (_req, res, next) => {

  const { systemContent, user_arguments } = res.locals; 

  if (!systemContent) {
    const error: ServerError = {
      log: 'queryOpenAIArgument did not receive system content ',
      status: 500,
      message: { err: 'An error occurred before querying OpenAI' },
    };
    return next(error);
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: systemContent,
        },
        {
          role: 'user',
          content: user_arguments,
        },
      ],
      temperature: 1.3,
    });

    const argumentParams = JSON.parse(response.choices[0].message.content!);
    if (argumentParams) {
      res.locals.ai_argument = argumentParams.ai_argument;
      res.locals.ai_reasoning = argumentParams.ai_reasoning;
      res.locals.ai_strong_point = argumentParams.ai_strong_point;
      res.locals.ai_weak_point = argumentParams.ai_weak_point;
      res.locals.user_strong_point = argumentParams.user_strong_point;
      res.locals.user_weak_point = argumentParams.user_weak_point;
      return next();
    } else {
      const apiError: ServerError = {
        log: 'OpenAI did not return an argument',
        status: 500,
        message: { err: 'An error occurred while querying OpenAI' },
      };
      return next(apiError);
    }
  } catch (err) {
    const apiError: ServerError = {
      log: 'queryOpenAI: Error: OpenAI error' + err,
      status: 500,
      message: { err: 'An error occurred while querying OpenAI' },
    };
    return next(apiError);
  }
  
}

export const queryOpenAIEmbedding: RequestHandler = async (_req, res, next) => {
  const { userQuery, startYear, endYear } = res.locals;

  const userQueryAndYears = `userQuery: ${userQuery}, filtered from year ${startYear} to year ${endYear}.`;

  if (!userQuery) {
    const error: ServerError = {
      log: 'queryOpenAIEmbedding did not receive a user query',
      status: 500,
      message: { err: 'An error occurred before querying OpenAI' },
    };
    return next(error);
  }
  try {
    // add code here to query OpenAI for embedidngs
    const embedding = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: userQueryAndYears,
      encoding_format: 'float',
    });
    // console.log(embedding.data[0].embedding);
    res.locals.embedding = embedding.data[0].embedding;
    return next();
  } catch (err) {
    const apiError: ServerError = {
      log: 'queryOpenAI: Error: OpenAI error' + err,
      status: 500,
      message: { err: 'An error occurred while querying OpenAI' },
    };
    return next(apiError);
  }
};

export const queryOpenAIChat: RequestHandler = async (_req, res, next) => {
  const { userQuery, pineconeQueryResult, startYear, endYear } = res.locals;
  if (!userQuery) {
    const error: ServerError = {
      log: 'queryOpenAIChat did not receive a user query',
      status: 500,
      message: { err: 'An error occurred before querying OpenAI' },
    };
    return next(error);
  }
  if (!pineconeQueryResult) {
    const error: ServerError = {
      log: 'queryOpenAIChat did not receive pinecone query results',
      status: 500,
      message: { err: 'An error occurred before querying OpenAI' },
    };
    return next(error);
  }

  const pineconeQueryResultFriendlier = pineconeQueryResult.map((movieObj) => {
    if (movieObj.metadata) {
      return `title: ${movieObj.metadata.title}, \nscore: ${movieObj.score}, \n year: ${movieObj.metadata.year}, \nplot: ${movieObj.metadata.plot} `;
    }
  });
  // add code here to ask llm
  // info sources:
  // 1. user input
  // 2. pineconeQueryResult
  // 3. system prompt
  console.log(res.locals.lastRecommendation);

  const userFavoritesPrompt = res.locals.userTopMovies
    ? `
  Here are my favorite movies: ${res.locals.userTopMovies}. Take these into strong consideration when making your recommendations, and try to recommend movies that are similar to these.
  Prioritize these favorites over the similarity scores. They are crucial for making your decisions.
  For example, if a user's five favorite movies are all Pixar movies, recommend them other modern animated movies for children, or movies from similar studios.

  `
    : '';

  const regenerationPrompt = res.locals.hasBeenCalled
    ? `
  Whatever you do, do NOT recommend ANY of the movies from "${res.locals.lastRecommendation}". This is very important.
  No matter what you may think is right for the user, do not recommend a movie from "${res.locals.lastRecommendation}".
  If this list includes all of the movies provided to you, you must recommend a movie not listed in the rag document.
  `
    : '';

  const systemPrompt = `You are a movie expert. 
  Your role is to recommend the perfect movie with the help of a RAG database and a user query.
  Taking into account the following context, complete this task.
  The user will provide you with a natural language query, a year range, as well as some context consisting of five movies pulled from a RAG database.

  Example Data:
    title: 'Changes',
    score: 0.487377346,
    year: 1969,
    plot: 'Set in the 1960s, the film follows the lead character Kent (Lane), as he travels along the California coast.[1] As he drifts, he recalls his former troubled girlfriend, Bobbi (Manuela Thiess) who committed suicide after he broke off their relationship. During his travels he meets up with different women. However, he moves along rather than stay put in hopes of finding a meaning to his life.',

  Guidance:
  Make sure to look at the movies provided in the, and also note the score property. The score is not a user rating. It is a marker of how similar the movie's summary is to the user's query.
  You should take these scores into consideration.
  You don't necessarily have to choose one of the three movies provided, but you are advised to consider their scores, and prioritize movies with higher scores.
  Please only recommend the movie within the year range that user provided.

  Output Format:
  The output should be a valid Javascript object with the following structure and no carrige returns (do not include \n):
  {
  "recommendation": "the title and year of the movie you recommend", 
  "reason": "brief reasoning for the recommendations you make, why do you recommend this movie given the user input and the RAG context provided? 
  If you do not choose one of the three movies provided to you in RAG context, you must explain why you made a separate choice."
  }
`;
  // \n\n\
  // Reason: "detailed in-depth reasoning for
  // the recommendations you make, why do you recommend this movie given the user input and the RAG context provided?
  // If you do not choose one of the three movies provided to you in RAG context, you must explain why you made a separate choice."
  // `;

  // const userPrompt = `context: ${pineconeQueryResult}. \n\n User question: ${userQuery}`;Output Format:   `;

  // const userPrompt = `context: ${pineconeQueryResult}. \n\n User question: ${userQuery}`;
  const userPrompt = `
  DOCUMENT (context pulled from RAG database):
  ${pineconeQueryResultFriendlier}    

  ${userFavoritesPrompt}
  
  User question: 
  "${userQuery}, from year ${startYear} to year ${endYear}"

  ${regenerationPrompt}

  INSTRUCTIONS:
  Answer the users QUESTION using the DOCUMENT text above.
  Keep your answer ground in the facts of the DOCUMENT.
  If the DOCUMENT does not contain the facts to answer the QUESTION let me know.
  `;
  // const userPrompt = `context: ${pineconeQueryResult}`
  // console.log(`pineconeQueryResult: ${pineconeQueryResult[0]}`);

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      temperature: 0.7,
    });

    const completion = response.choices[0].message.content;
    if (completion) {
      res.locals.movieRecommendation = completion;
      return next();
    } else {
      const apiError: ServerError = {
        log: 'OpenAI did not return a completion',
        status: 500,
        message: { err: 'An error occurred while querying OpenAI' },
      };
      return next(apiError);
    }
  } catch (err) {
    const apiError: ServerError = {
      log: 'queryOpenAI: Error: OpenAI error' + err,
      status: 500,
      message: { err: 'An error occurred while querying OpenAI' },
    };
    return next(apiError);
  }


  // res.locals.movieRecommendation =
  //   'Wishmaster - A malevolent genie wreaks havoc after being freed, leading to a battle between his dark desires and those trying to stop him.';
  // return next();
};

export const queryOpenAIEvaluation = async(req, res, next) => {
    
}


