import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db, isDbConnected } from "@/lib/db";
import { projects } from "@/db/schema";

export async function GET() {
  if (!isDbConnected) return NextResponse.json({ projects: [] });
  try {
    const rows = await db
      .select()
      .from(projects)
      .orderBy(desc(projects.createdAt));
    return NextResponse.json({ projects: rows });
  } catch {
    return NextResponse.json({ projects: [] });
  }
}
