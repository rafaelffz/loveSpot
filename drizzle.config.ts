import type { Config } from "drizzle-kit";

export default {
  schema: "./server/database/schema.ts",
  out: "./server/database/migrations",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
} satisfies Config;
