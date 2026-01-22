import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const session = await auth.api.getSession({
      headers: req.headers as any,
    });

    if (!session || !session.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // attach user to request (very useful later)
    (req as any).user = session.user;

    next();
  } catch (error) {
    next(error);
  }
};
