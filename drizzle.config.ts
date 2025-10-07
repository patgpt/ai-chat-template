import "dotenv/config";

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  out: process.env.DRIZZLE_OUT_DIR ?? "./drizzle",
  schema: process.env.DRIZZLE_SCHEMA_PATH ?? "./src/db/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
});

