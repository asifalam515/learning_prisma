import { Request, Response } from "express";
import { postService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await postService.createPostInDb(req.body);
    res.send(201).json(result);
  } catch (error: any) {
    res.status(500).json({
      error: "Post Creation Failed",
    });
  }
};

export const postController = {
  createPost,
};
