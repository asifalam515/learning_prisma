import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Role } from "../generated/prisma/enums";
const auth = (roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    // Bearer <token>
    if (!token) {
      res.send("Please Provide Token");
    }
    try {
      const decodedToken = jwt.verify(token as string, "very secret");
      next();
    } catch (error: any) {
      console.error(error);
    }
  };
};
