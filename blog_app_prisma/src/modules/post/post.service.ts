import { Post } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createPostInDb = async (
  data: Omit<Post, "id" | "createdAt" | "updatedAt">
) => {
  const result = await prisma.post.create({ data });
  return result;
};
const getPostsFromDB = async () => {
  const result = await prisma.post.findMany();
  return result;
};
export const postService = { createPostInDb, getPostsFromDB };
