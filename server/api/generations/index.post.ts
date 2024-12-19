import { db } from "~/server/database/db";
import { generations } from "~/server/database/schema";
import { clerkClient, getAuth } from "vue-clerk/server";

interface BodyRequest {
  coupleName: string;
  date: string;
  message: string;
}

export default defineEventHandler(async (event) => {
  const { userId } = getAuth(event);

  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const body = await readBody<BodyRequest>(event);

  const generation = {
    userId,
    coupleName: body.coupleName,
    date: body.date ?? new Date().toLocaleDateString(),
    message: body.message,
  };

  await db.insert(generations).values(generation);
});
