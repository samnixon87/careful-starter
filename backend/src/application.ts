import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import cors from "cors";
import nocache from "nocache";

const createApp = () => {
  const app = express();

  // Load up some handy middleware
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use((_, res, next) => {
    res.contentType("application/json; charset=utf-8");
    next();
  });
  app.use(nocache());

  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );

  return app;
};

// Routes for tests

export default createApp;
