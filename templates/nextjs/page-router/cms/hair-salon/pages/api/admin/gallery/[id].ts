import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { eq } from "drizzle-orm";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { db } from "@/lib/db";
import { galleryImage } from "@/db/schema";
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
    const { alt, category, order } = req.body;
    const [updated] = await db
      .update(galleryImage)
      .set({ alt, category, order })
      .where(eq(galleryImage.id, id))
      .returning();
    await revalidatePaths(res, ["/gallery", "/"]);
    return res.json(updated);
  }

  if (req.method === "DELETE") {
    const existing = await db
      .select({ publicId: galleryImage.publicId })
      .from(galleryImage)
      .where(eq(galleryImage.id, id))
      .limit(1);
    if (existing[0]) {
      await cloudinary.uploader.destroy(existing[0].publicId).catch(() => {});
    }
    await db.delete(galleryImage).where(eq(galleryImage.id, id));
    await revalidatePaths(res, ["/gallery", "/"]);
    return res.json({ ok: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
