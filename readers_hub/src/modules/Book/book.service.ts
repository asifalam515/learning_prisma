import { Book } from "@prisma/client";
import { prisma } from "../../lib/prisma";

const createBookToDB = async (data: Book) => {
  const newBook = await prisma.book.create({ data });
  return newBook;
};

export const bookService = { createBookToDB };
