import express from "express";
import { addPost, getPosts } from "../controllers/post.controller";

const postRouter = express.Router();

postRouter.post("/", addPost);
postRouter.get("/", getPosts);

export default postRouter;
