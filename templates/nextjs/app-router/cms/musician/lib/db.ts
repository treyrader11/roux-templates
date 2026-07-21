import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/db/schema";

type Db = ReturnType<typeof drizzle<typeof schema>>;

const globalForDb = globalThis as unknown as { db?: Db | null };

/**
 * Build the Drizzle client, or null when there's no DATABASE_URL. `neon("")`
 * throws, so this keeps the module importable and lets pages degrade gracefully
 * instead of crashing the whole server at import time.
 */
function createDb(): Db | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  try {
    return drizzle(neon(url), { schema });
  } catch {
    return null;
  }
}

const instance = globalForDb.db !== undefined ? globalForDb.db : createDb();

if (process.env.NODE_ENV !== "production") {
  globalForDb.db = instance;
}

export const isDbConnected = instance !== null;

/** Typed as non-null for ergonomic call sites; guard reads with `isDbConnected`. */
export const db = instance as Db;
