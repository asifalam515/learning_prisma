import { toNodeHandler } from "better-auth/node";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { auth } from "./lib/auth";
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.all("/api/auth/*splat", toNodeHandler(auth));
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
