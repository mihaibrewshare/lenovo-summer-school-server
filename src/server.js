import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { checkUsernameHeader } from "./middlewares/username.middleware";

import postRouter from "./routes/post.route";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/post", checkUsernameHeader, postRouter);

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => app.listen(3030))
  .then(() => console.log("Connected to DB and listening to port 3030"))
  .catch((err) => console.log(err));
