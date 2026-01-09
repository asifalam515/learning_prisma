import cors from "cors";
import express from "express";
import routes from "./modules/user/routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1", routes);
export default app;
