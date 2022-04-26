import fs from "fs-extra";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const { writeJSON, readJSON, writeFile, createReadStream, createWriteStream } =
  fs;

const dataPathFolder = join(dirname(fileURLToPath(import.meta.url)), "../data");
console.log(dataPathFolder);

const movieDataPath = join(dataPathFolder, "movies.json");

export const getMovies = () => readJSON(movieDataPath);

export const postMovies = (content) => writeJSON(movieDataPath, content);
