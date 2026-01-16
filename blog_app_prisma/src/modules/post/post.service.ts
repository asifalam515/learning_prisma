import { Post } from "../../../generated/prisma/client";
import { PostWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { PostStatus } from "./../../../generated/prisma/enums";

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
const getPostsFromDB = async ({
  search,
  tags,
  isFeatured,
  status,
  authorId,
  page,
  limit,
  skip,
  sortOrder,
  sortBy,
}: {
  search: string | undefined;
  tags: string[] | [];
  isFeatured: Boolean | undefined;
  status: PostStatus | undefined;
  authorId: string | undefined;
  page: number;
  limit: number;
  skip: number;
  sortOrder: string | undefined;
  sortBy: string | undefined;
}) => {
  const andConditions: PostWhereInput[] = [];
  if (search) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: search as string,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: search as string,
            mode: "insensitive",
          },
        },
        {
          tags: {
            has: search as string,
          },
        },
      ],
    });
  }
  if (tags.length > 0) {
    andConditions.push({
      tags: {
        hasEvery: tags as string[],
      },
    });
  }
  if (typeof isFeatured === "boolean") {
    andConditions.push({ isFeatured });
  }
  if (status) {
    andConditions.push({
      status,
    });
  }
  if (authorId) {
    andConditions.push({
      authorId,
    });
  }
  const allPost = await prisma.post.findMany({
    skip: skip,
    take: limit,
    where: {
      AND: andConditions,
    },
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : { createdAt: "desc" },
  });
  return allPost;
};
export const postService = { createPostInDb, getPostsFromDB };
