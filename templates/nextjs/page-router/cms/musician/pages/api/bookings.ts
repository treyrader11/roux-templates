import type { NextApiRequest, NextApiResponse } from "next";
import { db, isDbConnected } from "@/lib/db";
import { bookings } from "@/db/schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") return res.status(405).end();
  if (!isDbConnected) {
    return res.status(503).json({ error: "Database not configured." });
  }

  const b = req.body ?? {};
  if (!b.clientName || !b.clientEmail) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  try {
    const [row] = await db
      .insert(bookings)
      .values({
        clientName: b.clientName,
        clientEmail: b.clientEmail,
        clientPhone: b.clientPhone ?? null,
        eventType: b.eventType ?? null,
        eventDate: b.eventDate ? new Date(b.eventDate) : null,
        budget: b.budget ?? null,
        message: b.message ?? null,
      })
      .returning();
    return res.status(201).json({ booking: row });
  } catch {
    return res.status(500).json({ error: "Failed to create booking." });
  }
}
