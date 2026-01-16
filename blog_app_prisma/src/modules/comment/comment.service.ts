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
export const commentService = { createComment };
