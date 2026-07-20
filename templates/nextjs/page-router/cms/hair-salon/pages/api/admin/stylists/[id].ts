import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { eq } from "drizzle-orm";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { db } from "@/lib/db";
import { stylist } from "@/db/schema";
import { revalidatePaths } from "@/lib/revalidate";

const STYLIST_PATHS = ["/stylists", "/", "/booking"];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user) return res.status(401).json({ error: "Unauthorized" });

  const id = String(req.query.id);

  if (req.method === "PUT") {
    const { name, role, bio, imageUrl, instagram, order, active } = req.body;
    const [updated] = await db
      .update(stylist)
      .set({ name, role, bio, imageUrl, instagram, order, active })
      .where(eq(stylist.id, id))
      .returning();
    await revalidatePaths(res, STYLIST_PATHS);
    return res.json(updated);
  }

  if (req.method === "DELETE") {
    await db.delete(stylist).where(eq(stylist.id, id));
    await revalidatePaths(res, STYLIST_PATHS);
    return res.json({ ok: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
