import cors from "cors";
import express from "express";
import equipmentRouter from "./modules/equipment/equipment.router";
import logRouter from "./modules/usage-log/log.router";
import routes from "./modules/user/routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1", routes);
app.use("/api/v1/equipment", equipmentRouter);
app.use("/api/v1/usageLog", logRouter);

export default app;
