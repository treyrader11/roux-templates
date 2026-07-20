import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { desc } from "drizzle-orm";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { db } from "@/lib/db";
import { booking } from "@/db/schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user) return res.status(401).json({ error: "Unauthorized" });

  if (req.method === "GET") {
    const bookings = await db
      .select()
      .from(booking)
      .orderBy(desc(booking.createdAt));
    return res.json(bookings);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
