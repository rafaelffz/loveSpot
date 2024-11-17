import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const { tursoDBURL, tursoAuthToken } = useRuntimeConfig();

const turso = createClient({
  url: tursoDBURL,
  authToken: tursoAuthToken,
});

export const db = drizzle(turso);
