import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env.local" });

export default {
  schema: "./lib/db/schema.ts",
  out: "./migrations",
  driver: "mysql2",
  // dbCredentials: {
  //   host: process.env.DATABASE_HOST!,
  //   user: process.env.DATABASE_USERNAME,
  //   password: process.env.DATABASE_PASSWORD,
  //   database: process.env.DATABASE_NAME!,
  // },
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
