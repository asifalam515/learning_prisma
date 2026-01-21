import dotenv from "dotenv";
import express, { Request, Response } from "express";
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
console.log(process.env.PORT);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
