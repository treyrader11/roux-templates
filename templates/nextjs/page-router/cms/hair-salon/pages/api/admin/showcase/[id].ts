import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { eq } from "drizzle-orm";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { db } from "@/lib/db";
import { showcaseItem } from "@/db/schema";
import cloudinary from "@/lib/cloudinary";
import { revalidatePaths } from "@/lib/revalidate";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user) return res.status(401).json({ error: "Unauthorized" });

  const id = String(req.query.id);

  if (req.method === "PUT") {
    const { name, subtitle, price, href, order, active } = req.body;
    const [updated] = await db
      .update(showcaseItem)
      .set({ name, subtitle, price, href, order, active })
      .where(eq(showcaseItem.id, id))
      .returning();
    await revalidatePaths(res, ["/"]);
    return res.json(updated);
  }

  if (req.method === "DELETE") {
    const [existing] = await db
      .select({ publicId: showcaseItem.publicId })
      .from(showcaseItem)
      .where(eq(showcaseItem.id, id))
      .limit(1);
    if (existing) {
      await cloudinary.uploader.destroy(existing.publicId).catch(() => {});
    }
    await db.delete(showcaseItem).where(eq(showcaseItem.id, id));
    await revalidatePaths(res, ["/"]);
    return res.json({ ok: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
