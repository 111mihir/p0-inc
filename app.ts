// src/app.ts

import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import appRoutes from "./src/routes/AppRoutes";

const app = express();

app.use(bodyParser.json());

app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use("/", appRoutes);

export default app;
