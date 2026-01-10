import { Router } from "express";
import { Role } from "../../generated/prisma/enums";
import auth from "../../middleware/auth";
import { logController } from "./log.controller";

const logRouter = Router();
logRouter.post("/", auth([Role.Admin]), logController.createUsageLog);
logRouter.get("/", logController.getUsageLog);
export default logRouter;
