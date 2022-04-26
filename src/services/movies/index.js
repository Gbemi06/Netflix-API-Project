import express from "express";
import uniqid from "uniqid";
import { getMovies, postMovies } from "../../lib/fs-tools.js";
import createError from "http-errors";
import { checkMovieSchema, checkValidationResult } from "./movieValidation.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const movieRouter = express.Router();

export const cloudinaryPloader = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "moviePosters",
    },
  }),
}).single("poster");

movieRouter.post(
  "/uploads",
  multer().single("poster"),
  async (req, res, next) => {
    try {
      console.log("file", req.file);
      res.send("done");
    } catch (error) {
      next(error);
    }
  }
);

movieRouter.post(
  "/",
  checkMovieSchema,
  checkValidationResult,
  async (req, res, next) => {
    try {
      const newMovie = { ...req.body, createdAt: new Date(), id: uniqid() };

      const moviesArr = await getMovies();
      let movies = moviesArr.Search;

      console.log("arrays of movies", movies);

      movies.push(newMovie);

      movies = moviesArr.Search;

      postMovies(moviesArr);

      res.send("movie was added successfully");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

movieRouter.get("/", async (req, res, next) => {
  try {
    const movies = await getMovies();
    console.log(movies.Search);
    res.send(movies);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

movieRouter.get("/:movieId", async (req, res, next) => {
  try {
    console.log("request successful:", req.body);
    const movieId = req.params.movieId;

    console.log("request ID:", movieId);
    const moviesArr = await getMovies();
    const movies = moviesArr.Search;
    console.log("movies:", movies);
    const getMovie = movies.find((movie) => movie.id === movieId);
    console.log("request ID:", getMovie);

    res.send(getMovie);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

movieRouter.put(
  "/:movieId",
  checkMovieSchema,
  checkValidationResult,
  async (req, res, next) => {
    try {
      // console.log("request successful:", req.body);
      const movieId = req.params.movieId;
      const moviesArr = await getMovies();
      let movies = moviesArr.Search;
      console.log("movies:", movies);
      const findMovieIndex = movies.findIndex(
        (movieIndex) => movieIndex.id === movieId
      );
      const editMovie = movies[findMovieIndex];
      const newMovie = { ...editMovie, ...req.body, updatedAt: new Date() };
      movies[findMovieIndex] = newMovie;

      movies = moviesArr.Search;

      postMovies(moviesArr);
      res.send(newMovie);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

movieRouter.delete("/:movieId", async (req, res, next) => {
  try {
    const movieId = req.params.movieId;
    console.log("request ID:", movieId);

    let moviesArr = await getMovies();
    let movies = moviesArr.Search;
    let getMovieIndex = movies.findIndex((movie) => movie.id === movieId);

    movies.splice(getMovieIndex, 1);

    movies = moviesArr.Search;

    console.log("request ID:", moviesArr);
    postMovies(moviesArr);
    res.send(`movie with id ${movieId} was deleted successfully`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default movieRouter;
