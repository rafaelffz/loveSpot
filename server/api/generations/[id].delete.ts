import { eq } from "drizzle-orm";
import { getAuth } from "vue-clerk/server";
import { db } from "~/server/database/db";
import { generations } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const { userId } = getAuth(event);
  const id = getRouterParam(event, "id");

  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Generation ID is required",
    });
  }

  await db.delete(generations).where(eq(generations.id, id));
});
