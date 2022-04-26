import { checkSchema, validationResult } from "express-validator";
import createError from "http-errors";

const movieSchema = {
  Title: {
    in: ["body"],
    isString: {
      errorMessage:
        "Title validation failed! Title is mandatory and must be a string",
    },
  },
  Year: {
    in: ["body"],
    isNumeric: {
      errorMessage:
        "Year validation failed! Year is mandatory and must be numeric",
    },
  },
  imdbID: {
    in: ["body"],
    isString: {
      errorMessage:
        "imdbID validation failed! imdbID is mandatory and must be a string",
    },
  },
  Type: {
    in: ["body"],
    isString: {
      errorMessage:
        "Type validation failed! Type is mandatory and must be a string",
    },
  },
  Poster: {
    in: ["body"],
    isString: {
      errorMessage:
        "Poster validation failed! Poster is mandatory and must be a string",
    },
  },
};

export const checkMovieSchema = checkSchema(movieSchema);

export const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // There is validation error
    next(
      createError(400, "Validation problems in request.body", {
        errorsList: errors.array(),
      })
    );
  } else {
    // All is fine
    next();
  }
};
