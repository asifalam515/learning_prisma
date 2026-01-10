import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";
import { auth } from "./lib/auth";
import equipmentRouter from "./modules/equipment/equipment.router";
import logRouter from "./modules/usage-log/log.router";
import routes from "./modules/user/routes";

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // Replace with your frontend's origin

    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.all("/api/auth/*", toNodeHandler(auth));

app.use(express.json());
app.use("/api/v1", routes);
app.use("/api/v1/equipment", equipmentRouter);
app.use("/api/v1/usageLog", logRouter);

export default app;
