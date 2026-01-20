import { NextFunction, Request, Response } from "express";
import { PostStatus } from "../../../generated/prisma/enums";
import paginationSortingHelper from "../../helpers/paginationSortingHelper";
import { UserRole } from "../../middlewares/auth";
import { postService } from "./post.service";

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({
        error: "Unauthorized",
      });
    }
    const result = await postService.createPostInDb(
      req.body,
      req.user?.id as string,
    );
    res.status(201).json(result);
  } catch (error: any) {
    next(error);
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

    // pagination
    // sorting
    const options = paginationSortingHelper(req.query);
    const { page, limit, skip, sortBy, sortOrder } = options;

    const result = await postService.getPostsFromDB({
      search: searchString,
      tags,
      isFeatured,
      status,
      authorId,
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
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
const getPostById = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      throw new Error("Post Id is required!!!");
    }
    const result = await postService.getPostByIdFromDB(postId);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getMyPost = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("You are unauthorize!");
    }
    const result = await postService.getMyPostFromDB(user?.id as string);

    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      error: "My Post Fetched Failed",
      details: error,
    });
  }
};
const updateMyPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("You are unauthorize!");
    }
    const { postId } = req.params;
    const isAdmin = user.role === UserRole.ADMIN;

    const result = await postService.updateMyPost(
      postId as string,
      req.body,
      user.id,
      isAdmin,
    );

    res.status(200).json(result);
  } catch (error: any) {
    next(error);
  }
};
const deleteMyPost = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("You are unauthorize!");
    }
    const { postId } = req.params;
    const isAdmin = user.role === UserRole.ADMIN;

    const result = await postService.deletePost(
      postId as string,
      user?.id as string,
      isAdmin,
    );

    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      error: "My post Delete Failed",
      details: error,
    });
  }
};
const getStats = async (req: Request, res: Response) => {
  try {
    const result = await postService.getStats();

    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      error: "Stats fetched Failed",
      details: error,
    });
  }
};
export const postController = {
  createPost,
  getAllPosts,
  getPostById,
  getMyPost,
  updateMyPost,
  deleteMyPost,
  getStats,
};
