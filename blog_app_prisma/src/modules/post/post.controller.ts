import { Request, Response } from "express";
import { PostStatus } from "../../../generated/prisma/enums";
import { postService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({
        error: "Unauthorized",
      });
    }
    const result = await postService.createPostInDb(
      req.body,
      req.user?.id as string
    );
    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({
      error: "Post Creation Failed",
    });
  }
};
const getAllPosts = async (req: Request, res: Response) => {
  try {
    const search = req.query.search;

    const searchString = typeof search === "string" ? search : undefined;
    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];

    // query by status
    const status = req.query.status as PostStatus;
    const authorId = req.query.authorId as string | undefined;

    // features
    //  we will accept only true and false

    const isFeatured =
      typeof req.query.isFeatured === "string"
        ? req.query.isFeatured === "true"
          ? true
          : req.query.isFeatured === "false"
          ? false
          : undefined
        : undefined;
    const result = await postService.getPostsFromDB({
      search: searchString,
      tags,
      isFeatured,
      status,
      authorId,
    });
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
