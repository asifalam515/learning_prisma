import { Request, Response } from "express";
import { bookService } from "./book.service";
const createBook = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await bookService.createBookToDB(data);
    res.status(200).json({
      success: true,
      message: "New Book Created",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Book Creation Failed",
    });
  }
};
export const bookController = { createBook };
