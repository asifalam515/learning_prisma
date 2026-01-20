import { Router } from "express";
import { postController } from "./post.controller";

import auth, { UserRole } from "../../middlewares/auth";
const router = Router();
router.get(
  "/my-posts",
  auth(UserRole.USER, UserRole.ADMIN),
  postController.getMyPost,
);
router.get("/stats", auth(UserRole.ADMIN), postController.getStats);
router.get("/:postId", postController.getPostById);
router.get("/", postController.getAllPosts);
router.patch(
  "/:postId",
  auth(UserRole.ADMIN, UserRole.USER),
  postController.updateMyPost,
);
router.post(
  "/",
  auth(UserRole.USER, UserRole.ADMIN),
  postController.createPost,
);
router.delete(
  "/:postId",
  auth(UserRole.USER, UserRole.ADMIN),
  postController.deleteMyPost,
);

export const postRouter = router;
