import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { eq } from "drizzle-orm";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { db } from "@/lib/db";
import { user as users } from "@/db/schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (session?.user?.role !== "ADMIN") {
    return res.status(403).json({ error: "Forbidden" });
  }

  const id = String(req.query.id);

  if (req.method === "DELETE") {
    if (session.user.id === id) {
      return res.status(400).json({ error: "You cannot delete your own account" });
    }
    await db.delete(users).where(eq(users.id, id));
    return res.json({ ok: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
