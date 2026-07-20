import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/db/schema";

type Db = ReturnType<typeof drizzle<typeof schema>>;

const globalForDb = globalThis as unknown as { db?: Db | null };

/**
 * Build the client, or return null when there is nothing to connect to.
 * `neon("")` throws, so an unset DATABASE_URL used to crash the server at import
 * time — this keeps the module importable so the app can render a setup screen
 * instead of a stack trace.
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

/**
 * True when DATABASE_URL is set and the driver initialized. Server-only — never
 * import this into client-bundled code (see `dbProps`).
 */
export const isDbConnected = instance !== null;

/**
 * Spread into a DB-backed page's props. `_app` reads `pageProps.dbConnected`, so
 * it never imports this module — doing so would pull the Neon driver into the
 * client bundle and, because DATABASE_URL is not public, always report
 * "disconnected" in the browser.
 */
export const dbProps = { dbConnected: isDbConnected };

/**
 * Typed as non-null so the ~30 existing call sites keep type-checking. When
 * DATABASE_URL is missing this is null at runtime — every read path goes through
 * `safeList()` / `getContentBySlugs()` in lib/cms.ts, which already swallow
 * errors and fall back to in-code defaults, and `_app` renders <SetupRequired />
 * in place of the page.
 */
export const db = instance as Db;
