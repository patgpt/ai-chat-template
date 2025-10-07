import type { NeonQueryFunction } from "@neondatabase/serverless";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Please add it to your environment variables.",
  );
}

const sql = neon(connectionString);

export const db = drizzle(sql);
export type DbClient = typeof db;
export type SqlClient = NeonQueryFunction<boolean, boolean>;

