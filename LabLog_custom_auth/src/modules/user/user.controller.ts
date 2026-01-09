import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
const register = async (req: Request, res: Response) => {
  const payLoad = req.body;
  const user = await prisma.user.create({
    data: payLoad,
  });
  res.send({ message: "Register successfully", data: user });
};
export const userController = { register };
