import { CommentStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const createComment = async (payload: {
  content: string;
  authorId: string;
  postId: string;
  parentId?: string;
}) => {
  const { content, authorId, postId, parentId } = payload;
  await prisma.post.findFirstOrThrow({
    where: {
      id: postId,
    },
  });
  if (parentId) {
    await prisma.comment.findFirstOrThrow({
      where: {
        id: parentId,
      },
    });
  }
  const result = await prisma.comment.create({
    data: payload,
  });
  return result;
};
const getCommentByIdFromDB = async (commentId: string) => {
  const result = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
    include: {
      post: {
        select: {
          id: true,
          title: true,
          views: true,
        },
      },
    },
  });
  return result;
};
const getCommentsByAuthor = async (authorId: string) => {
  const result = await prisma.comment.findMany({
    where: {
      authorId: authorId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      post: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
  return result;
};
// 1.nijer comment delete korte parbe... login thakte hobe+nijer comment kina check korte hobe
// 2.admin jekono comment delete korte parbe
const deleteComment = async (commentId: string, authorId: string) => {
  const commentData = await prisma.comment.findFirst({
    where: {
      id: commentId,
      authorId,
    },
    select: {
      id: true,
    },
  });
  if (!commentData) {
    throw new Error("Your Provided Input is invalid!");
  }
  const result = await prisma.comment.delete({
    where: {
      id: commentData.id,
    },
  });
  return result;
};
const updateComment = async (
  commentId: string,
  authorId: string,
  updatedData: {
    content?: string;
    status?: CommentStatus;
  }
) => {
  const commentData = await prisma.comment.findFirst({
    where: {
      id: commentId,
      authorId,
    },
    select: {
      id: true,
    },
  });
  if (!commentData) {
    throw new Error("Your Provided Input is Invalid");
  }
  const result = await prisma.comment.update({
    where: {
      id: commentData.id,
      authorId,
    },
    data: updatedData,
  });
  return result;
};
const moderateComment = async (
  commentId: string,
  data: {
    status: CommentStatus;
  }
) => {
  const commentData = await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
    },
    select: {
      id: true,
      status: true,
    },
  });
  if (commentData.status === data.status) {
    throw new Error(
      `Your provided status (${data.status}) is already up to date`
    );
  }
  const result = await prisma.comment.update({
    where: {
      id: commentId,
    },
    data,
  });
  return result;
};
export const commentService = {
  createComment,
  getCommentByIdFromDB,
  getCommentsByAuthor,
  deleteComment,
  updateComment,
  moderateComment,
};
