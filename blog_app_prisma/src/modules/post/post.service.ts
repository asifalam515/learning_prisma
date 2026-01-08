import { Post } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createPostInDb = async (
  data: Omit<Post, "id" | "createdAt" | "updatedAt" | "authorId">,
  userId: string
) => {
  const result = await prisma.post.create({
    data: {
      ...data,
      authorId: userId,
    },
  });
  return result;
};
const getPostsFromDB = async () => {
  const result = await prisma.post.findMany();
  return result;
};
export const postService = { createPostInDb, getPostsFromDB };
