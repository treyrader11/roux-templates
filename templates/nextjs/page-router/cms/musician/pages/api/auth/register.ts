import type { NextApiRequest, NextApiResponse } from "next";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { db, isDbConnected } from "@/lib/db";
import { users } from "@/db/schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") return res.status(405).end();
  if (!isDbConnected) {
    return res.status(503).json({ error: "Database not configured." });
  }

  const { name, email, password } = req.body ?? {};
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const [existing] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, String(email).toLowerCase()))
      .limit(1);
    if (existing) {
      return res.status(409).json({ error: "That email is already registered." });
    }

    const hashed = await bcrypt.hash(String(password), 10);
    await db
      .insert(users)
      .values({ name: name ?? null, email: String(email).toLowerCase(), password: hashed });

    return res.status(201).json({ ok: true });
  } catch {
    return res.status(500).json({ error: "Could not create account." });
  }
}
