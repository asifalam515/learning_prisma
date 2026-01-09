import bcrypt from "bcryptjs";
import { Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma";
const register = async (req: Request, res: Response) => {
  const payload = req.body;
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const user = await prisma.user.create({
    data: { ...payload, password: hashedPassword },
  });
  res.send({ message: "Register successfully", data: user });
};

const login: RequestHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.send({
      message: "User Not Found",
    });
  }
  const matchPass = await bcrypt.compare(password, user.password);
  if (!matchPass) {
    return res.send({
      message: "Invalid Password",
    });
  }
  // as password matched ,now we will give them a token
  const token = jwt.sign({ id: user.id, role: user.role }, "very secret", {
    expiresIn: "7d",
  });

  res.send({ message: "logged in successfully and token give", token });
};
export const userController = { register, login };
