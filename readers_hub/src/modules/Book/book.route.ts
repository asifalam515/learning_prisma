import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware";
import { bookController } from "./book.controller";

const bookRouter = Router();
bookRouter.post("/", requireAuth, bookController.createBook);
export default bookRouter;
