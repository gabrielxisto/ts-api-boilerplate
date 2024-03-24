import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { AppError } from "./errors/AppError";
import { Routes } from "./routes";
import cors from 'cors';
import cookieParser from 'cookie-parser';

const App = express();

App.use(express.json());
App.use(cors());
App.use(cookieParser());
App.use(Routes);

App.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

App.listen(process.env.PORT, () => console.log(`[Server] - Is running in port ${process.env.PORT}`));
