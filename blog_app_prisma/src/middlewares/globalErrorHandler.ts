import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client";
function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (res.headersSent) {
    return next(err);
  }
  let statusCode = 500;
  let errorMessage = "Internal Server Error";
  let errorDetails = err;
  //   PrismaClientValidationError
  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    errorMessage = "You Provide incorrect field type or missing fields!";
  }
  res.status(statusCode);
  res.json({
    message: errorMessage,
    error: errorDetails,
  });
}
export default errorHandler;
