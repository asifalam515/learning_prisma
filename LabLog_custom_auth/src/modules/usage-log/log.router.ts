import { Router } from "express";
import { logController } from "./log.controller";

const logRouter = Router();
logRouter.post("/", logController.createUsageLog);
logRouter.get("/", logController.getUsageLog);
export default logRouter;
