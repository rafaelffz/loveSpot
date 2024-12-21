import { db } from "~/server/database/db";
import { generations } from "~/server/database/schema";
import { clerkClient, getAuth } from "vue-clerk/server";
import dayjs from "dayjs";

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
    date: body.date,
    message: body.message,
  };

  await db.insert(generations).values(generation);

  const userEmail = (await clerkClient(event).users.getUser(userId))
    .emailAddresses[0].emailAddress;

  const firstName = (await clerkClient(event).users.getUser(userId)).firstName;

  await sendEmail({
    to: userEmail,
    subject: "Geração criada!",
    html: `
      <h1 style="color: black;"> ${firstName}, sua geração foi criada com sucesso!</h1>

      <h3>
        <span style="font-weight: 700;">Nome do casal:</span> ${generation.coupleName}
      </h3>

      <h3>
        <span style="font-weight: 700;">Data de criação:</span> ${dayjs(new Date()).format("DD/MM/YYYY h:mm A")}
      </h3>

      <p>Você pode visualizar os detalhes da sua geração no painel do nosso site, basta acessar o link abaixo:</p>
      <a href="http://localhost:3000/dashboard">Acessar painel</a>
    `,
  });
});
