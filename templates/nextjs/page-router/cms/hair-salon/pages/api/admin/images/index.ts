import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { eq, like } from "drizzle-orm";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { db } from "@/lib/db";
import { siteImage } from "@/db/schema";
import cloudinary from "@/lib/cloudinary";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { prefix } = req.query;
    const images = prefix
      ? await db
          .select()
          .from(siteImage)
          .where(like(siteImage.slug, `${String(prefix)}%`))
      : await db.select().from(siteImage);
    return res.json(images);
  }

  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { slug, url, publicId, alt } = req.body;
    if (!slug || !url || !publicId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Remove the old Cloudinary asset if replacing an existing slug.
    const existing = await db
      .select({ publicId: siteImage.publicId })
      .from(siteImage)
      .where(eq(siteImage.slug, slug))
      .limit(1);
    if (existing[0]) {
      await cloudinary.uploader.destroy(existing[0].publicId).catch(() => {});
    }

    const [image] = await db
      .insert(siteImage)
      .values({ slug, url, publicId, alt: alt ?? null, updatedBy: session.user.email })
      .onConflictDoUpdate({
        target: siteImage.slug,
        set: { url, publicId, alt: alt ?? null, updatedBy: session.user.email, updatedAt: new Date() },
      })
      .returning();

    return res.json(image);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
