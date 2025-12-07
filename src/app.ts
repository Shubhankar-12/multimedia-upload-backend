import * as dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import express, { Application } from "express";
import bodyParser from "body-parser";

import { apiRouter } from "./routes";

// opening a db connection
import { DataBase } from "./db/connection";
DataBase.getDatabaseConnection();

const app: Application = express();

app.use(
  cors({
    origin: process.env.LIVE_URL,
  })
);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.use("*", (req, res) => {
  res.status(404);
  res.send({
    isSuccess: false,
    data: null,
    statusCode: 404,
    errors: [
      {
        code: 404,
        message: "Error 404",
      },
    ],
  });
});

export { app };
