import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
const auth = (roles?: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    // Bearer <token>
    if (!token) {
      res.send("Please Provide Token");
    }
    try {
      const decoded = jwt.verify(token as string, "very secret");

      if (!decoded) return res.send("Unauthorized");
      //   set user globally to the application
      req.user = decoded as JwtPayload;
      // role based
      if (roles && !roles.includes(req.user.role)) {
        return res.send("Forbidden");
      }

      next();
    } catch (error: any) {
      console.error(error);
    }
  };
};
export default auth;
