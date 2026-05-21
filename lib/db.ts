import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("Missing DATABASE_URL. Set it in .env.local and your deployment environment.");
}

/**
 * Reusable Neon SQL client.
 * Import this from server-only code (Server Actions, Route Handlers, loaders).
 */
export const sql = neon(databaseUrl);
