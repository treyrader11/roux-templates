import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { eq } from "drizzle-orm";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { db } from "@/lib/db";
import { siteImage } from "@/db/schema";
import cloudinary from "@/lib/cloudinary";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const slug = String(req.query.slug);
  const existing = await db
    .select({ publicId: siteImage.publicId })
    .from(siteImage)
    .where(eq(siteImage.slug, slug))
    .limit(1);
  if (!existing[0]) {
    return res.status(404).json({ error: "Not found" });
  }

  await cloudinary.uploader.destroy(existing[0].publicId).catch(() => {});
  await db.delete(siteImage).where(eq(siteImage.slug, slug));

  return res.json({ ok: true });
}
