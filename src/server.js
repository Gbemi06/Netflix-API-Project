import express from "express";
import listUrl from "express-list-endpoints";
import cors from "cors";
import { join } from "path";
import movieRouter from "./services/movies/index.js";

const port = 3001;

const server = express();

const publicFolderPath = join(process.cwd(), "./public");
console.log(publicFolderPath);

server.use(express.json());
server.use(cors());
server.use("/movies", movieRouter);

server.listen(port, () => {
  console.table(listUrl(server));
  console.log(`working server port is ${port}`);
});
