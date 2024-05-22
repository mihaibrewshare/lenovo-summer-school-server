import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => app.listen(3030))
  .then(() => console.log("Connected to DB and listening to port 3030"))
  .catch((err) => console.log(err));
