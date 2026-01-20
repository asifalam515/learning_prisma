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
  //    PrismaClientKnownRequestError
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      statusCode = 400;
      errorMessage =
        "An operation failed because it depends on one or more records that were required but not found. {cause}";
    } else if (err.code === "P2002") {
      statusCode = 400;
      errorMessage = "Duplicate Error Key ";
    } else if (err.code === "P2003") {
      statusCode = 400;
      errorMessage = "Foreign key constraint failed";
    }
  } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    statusCode = 500;
    errorMessage =
      "The specific error code is accessible via the .code property of the exception object. You must check this property to determine the exact cause of the error. ";
  } else if (err instanceof Prisma.PrismaClientRustPanicError) {
    statusCode = 500;
    errorMessage =
      "Prisma Client throws a PrismaClientRustPanicError exception if the underlying engine crashes and exits with a non-zero exit code. In this case, Prisma Client or the whole Node process must be restarted.";
  }
  res.status(statusCode);
  res.json({
    message: errorMessage,
    error: errorDetails,
  });
}
export default errorHandler;
