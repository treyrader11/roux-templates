import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/db/schema";

const globalForDb = globalThis as unknown as {
  db?: ReturnType<typeof drizzle<typeof schema>>;
};

const sql = neon(process.env.DATABASE_URL ?? "");

export const db =
  globalForDb.db ?? drizzle(sql, { schema });

if (process.env.NODE_ENV !== "production") {
  globalForDb.db = db;
}
