import { Request, Response } from "express";
import { postService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await postService.createPostInDb(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({
      error: "Post Creation Failed",
    });
  }
};
const getAllPosts = async (req: Request, res: Response) => {
  try {
    const result = await postService.getPostsFromDB();
    res.status(200).json({
      message: "get all data",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const postController = {
  createPost,
  getAllPosts,
};
