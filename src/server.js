import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { checkAuthToken } from "./middlewares/auth.middleware";
import { checkUsernameHeader } from "./middlewares/username.middleware";

import postRouter from "./routes/post.route";
import userRouter from "./routes/user.routes";

const app = express();

app.use(express.json());
app.use(cors());

// TODO: 'checkUsernameHeader' -> 'checkAuthToken' ( if we decide to implement register&login using JWT )
app.use("/api/post", checkUsernameHeader /* checkAuthToken */, postRouter);
app.use("/api/user", userRouter);

// TODO: use MongoDB Atlas ( 2 clusters -> one for individual usage, one for group usage )
mongoose
  .connect("mongodb://localhost:27017")
  .then(() => app.listen(3030))
  .then(() => console.log("Connected to DB and listening to port 3030"))
  .catch((err) => console.log(err));
