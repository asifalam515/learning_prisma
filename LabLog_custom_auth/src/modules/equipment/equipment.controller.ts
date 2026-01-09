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

export const equipmentController = {
  createEquipment,
};
