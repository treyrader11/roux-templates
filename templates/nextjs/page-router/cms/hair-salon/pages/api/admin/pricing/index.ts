import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { asc } from "drizzle-orm";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { db } from "@/lib/db";
import { pricingPackage } from "@/db/schema";
import { revalidatePaths } from "@/lib/revalidate";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const packages = await db
      .select()
      .from(pricingPackage)
      .orderBy(asc(pricingPackage.order));
    return res.json(packages);
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user) return res.status(401).json({ error: "Unauthorized" });

  if (req.method === "POST") {
    const { name, price, description, features, featured, order } = req.body;
    if (!name || !price) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const [created] = await db
      .insert(pricingPackage)
      .values({
        name,
        price,
        description: description ?? null,
        features: JSON.stringify(features ?? []),
        featured: featured ?? false,
        order: order ?? 0,
      })
      .returning();
    await revalidatePaths(res, ["/pricing"]);
    return res.json(created);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
