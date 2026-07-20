import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { eq } from "drizzle-orm";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { db } from "@/lib/db";
import { booking, type BookingStatus } from "@/db/schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user) return res.status(401).json({ error: "Unauthorized" });

  const id = String(req.query.id);

  if (req.method === "PUT") {
    const { status } = req.body as { status: BookingStatus };
    const [updated] = await db
      .update(booking)
      .set({ status })
      .where(eq(booking.id, id))
      .returning();
    return res.json(updated);
  }

  if (req.method === "DELETE") {
    await db.delete(booking).where(eq(booking.id, id));
    return res.json({ ok: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
