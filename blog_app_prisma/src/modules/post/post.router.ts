import { NextFunction, Request, Response, Router } from "express";
import { auth as betterAuth } from "../../lib/auth";
import { postController } from "./post.controller";
const router = Router();
const auth = (...roles: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //    get user session
    const session = await betterAuth.api.getSession({
      headers: req.headers as any,
    });
    console.log(session);

    next();
  };
};
router.post("/", auth("ADMIN", "USER"), postController.createPost);
router.get("/", postController.getAllPosts);
export const postRouter = router;
