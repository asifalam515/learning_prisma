import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express, { Application } from "express";
import { auth } from "./lib/auth";
import { postRouter } from "./modules/post/post.router";

const app: Application = express();
app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use(express.json());
app.use("/posts", postRouter);
app.use(
  cors({
    origin: "http://localhost:3000/", // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.get("/", (req, res) => {
  res.send("hello world");
  console.log("first application running");
});
export default app;
