import { desc, eq } from "drizzle-orm";
import { clerkClient, getAuth } from "vue-clerk/server";
import { db } from "~/server/database/db";
import { generations } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const { userId } = getAuth(event);

  if (!userId) {
    setResponseStatus(event, 401);
    return;
  }

  const gen = await db
    .select()
    .from(generations)
    .where(eq(generations.userId, userId))
    .orderBy(desc(generations.createdAt))
    .offset(0)
    .limit(10000);

  return { generations: gen };
});
