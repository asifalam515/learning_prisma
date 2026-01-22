import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { auth } from "./lib/auth";
import bookRouter from "./modules/Book/book.route";
dotenv.config();
const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);
const port = process.env.PORT || 3000;
app.use("/books", bookRouter);
// better auth router
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
