import { Request, RequestHandler, Response } from "express";
import { prisma } from "../../lib/prisma";
const createEquipment: RequestHandler = async (req: Request, res: Response) => {
  try {
    const payLoad = req.body;
    const result = await prisma.equipment.create({ data: payLoad });
    res.send({
      message: "Equipment added",
      data: result,
    });
  } catch (error: any) {
    console.log(error);
  }
};

const getEquipment = async (req: Request, res: Response) => {
  try {
    const data = await prisma.equipment.findMany();
    res.send({
      message: "get all equipment",
      data: data,
    });
  } catch (error: any) {
    console.error(error);
  }
};
export const equipmentController = {
  createEquipment,
  getEquipment,
};
