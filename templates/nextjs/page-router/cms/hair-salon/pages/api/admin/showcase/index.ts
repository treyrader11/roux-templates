import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { asc } from "drizzle-orm";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { db } from "@/lib/db";
import { showcaseItem } from "@/db/schema";
import { revalidatePaths } from "@/lib/revalidate";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const items = await db
      .select()
      .from(showcaseItem)
      .orderBy(asc(showcaseItem.order));
    return res.json(items);
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user) return res.status(401).json({ error: "Unauthorized" });

  if (req.method === "POST") {
    const { imageUrl, publicId, name, subtitle, price, href, order } = req.body;
    if (!imageUrl || !publicId) {
      return res.status(400).json({ error: "An image is required" });
    }
    const [created] = await db
      .insert(showcaseItem)
      .values({
        imageUrl,
        publicId,
        name: name ?? "",
        subtitle: subtitle ?? null,
        price: price ?? null,
        href: href ?? null,
        order: order ?? 0,
      })
      .returning();
    await revalidatePaths(res, ["/"]);
    return res.json(created);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
