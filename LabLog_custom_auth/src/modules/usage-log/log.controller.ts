import { RequestHandler } from "express";
import { prisma } from "../../lib/prisma";

const createUsageLog: RequestHandler = async (req, res) => {
  try {
    const payload = req.body;
    const log = await prisma.usageLog.create({ data: payload });
    res.send({
      message: "Usage Log created",
      data: log,
    });
  } catch (error: any) {
    console.error(error);
  }
};

const getUsageLog: RequestHandler = async (req, res) => {
  try {
    const data = await prisma.usageLog.findMany({
      include: { user: true, equipment: true },
    });
    res.send({
      message: "Retrieve all Usage Log",
      data: data,
    });
  } catch (error: any) {
    console.error(error);
  }
};

export const logController = { getUsageLog, createUsageLog };
