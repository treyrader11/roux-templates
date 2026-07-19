import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === "GET") {
      const bookings = await prisma.booking.findMany({
        orderBy: { createdAt: "desc" },
        include: { service: true, staff: true },
      });
      return res.status(200).json(bookings);
    }

    if (req.method === "POST") {
      const { clientName, clientEmail, clientPhone, serviceId, date, notes } =
        req.body;
      if (!clientName || !clientEmail || !serviceId || !date) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const booking = await prisma.booking.create({
        data: {
          clientName,
          clientEmail,
          clientPhone: clientPhone || null,
          serviceId,
          date: new Date(date),
          notes: notes || null,
          status: "pending",
        },
      });
      return res.status(201).json(booking);
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end();
  } catch {
    return res
      .status(503)
      .json({ error: "Could not process request (is the database configured?)" });
  }
}
