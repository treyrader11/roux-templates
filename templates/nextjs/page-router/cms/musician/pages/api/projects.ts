import type { NextApiRequest, NextApiResponse } from "next";
import { desc } from "drizzle-orm";
import { db, isDbConnected } from "@/lib/db";
import { projects } from "@/db/schema";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!isDbConnected) return res.status(200).json({ projects: [] });
  try {
    const rows = await db
      .select()
      .from(projects)
      .orderBy(desc(projects.createdAt));
    return res.status(200).json({ projects: rows });
  } catch {
    return res.status(200).json({ projects: [] });
  }
}
