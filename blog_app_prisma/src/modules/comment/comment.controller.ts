import { Request, Response } from "express";
import { commentService } from "./comment.service";

const createComment = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    req.body.authorId = user?.id;
    const result = await commentService.createComment(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({
      error: "Comment Creation Failed",
    });
  }
};
const getCommentById = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const result = await commentService.getCommentByIdFromDB(
      commentId as string
    );
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({
      error: "Comment fetched Failed",
    });
  }
};
const getCommentsByAuthor = async (req: Request, res: Response) => {
  try {
    const { authorId } = req.params;
    const result = await commentService.getCommentsByAuthor(authorId as string);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({
      error: "Comment fetched Failed by author",
    });
  }
};
export const commentController = {
  createComment,
  getCommentById,
  getCommentsByAuthor,
};
