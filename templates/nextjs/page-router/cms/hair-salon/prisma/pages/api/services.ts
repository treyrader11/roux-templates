import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === "GET") {
      const services = await prisma.service.findMany({
        where: { isActive: true },
        orderBy: { category: "asc" },
      });
      return res.status(200).json(services);
    }

    if (req.method === "POST") {
      const { name, description, price, duration, category } = req.body;
      if (!name || price == null || duration == null || !category) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const service = await prisma.service.create({
        data: {
          name,
          description: description || null,
          price: Number(price),
          duration: Number(duration),
          category,
        },
      });
      return res.status(201).json(service);
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end();
  } catch {
    return res
      .status(503)
      .json({ error: "Could not process request (is the database configured?)" });
  }
}
