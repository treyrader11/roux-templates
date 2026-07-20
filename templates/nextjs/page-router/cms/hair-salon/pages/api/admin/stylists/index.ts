import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { asc } from "drizzle-orm";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { db } from "@/lib/db";
import { stylist } from "@/db/schema";
import { revalidatePaths } from "@/lib/revalidate";

const STYLIST_PATHS = ["/stylists", "/", "/booking"];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const stylists = await db.select().from(stylist).orderBy(asc(stylist.order));
    return res.json(stylists);
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user) return res.status(401).json({ error: "Unauthorized" });

  if (req.method === "POST") {
    const { name, role, bio, imageUrl, instagram, order } = req.body;
    if (!name || !role) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const [created] = await db
      .insert(stylist)
      .values({
        name,
        role,
        bio: bio ?? "",
        imageUrl: imageUrl ?? null,
        instagram: instagram ?? null,
        order: order ?? 0,
      })
      .returning();
    await revalidatePaths(res, STYLIST_PATHS);
    return res.json(created);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
