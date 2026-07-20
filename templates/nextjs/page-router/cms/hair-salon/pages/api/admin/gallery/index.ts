import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { asc } from "drizzle-orm";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { db } from "@/lib/db";
import { galleryImage } from "@/db/schema";
import { revalidatePaths } from "@/lib/revalidate";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const images = await db
      .select()
      .from(galleryImage)
      .orderBy(asc(galleryImage.order));
    return res.json(images);
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user) return res.status(401).json({ error: "Unauthorized" });

  if (req.method === "POST") {
    const { url, publicId, alt, category, order } = req.body;
    if (!url || !publicId) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const [created] = await db
      .insert(galleryImage)
      .values({
        url,
        publicId,
        alt: alt ?? null,
        category: category ?? null,
        order: order ?? 0,
      })
      .returning();
    await revalidatePaths(res, ["/gallery", "/"]);
    return res.json(created);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
