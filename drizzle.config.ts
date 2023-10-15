import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env.local" });

export default {
  schema: "./lib/db/schema.ts",
  out: "./migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL! + "?sslmode=require",
  },
} satisfies Config;
