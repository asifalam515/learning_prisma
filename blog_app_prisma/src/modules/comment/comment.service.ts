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
export const commentService = { createComment, getCommentByIdFromDB };
