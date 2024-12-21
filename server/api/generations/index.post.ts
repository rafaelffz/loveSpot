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
      <h2 style="color: black;"> ${firstName}, sua geração foi criada com sucesso!</h2>

      <span>
        <span style="color: black; font-weight: 500; font-size: 16px;">Nome do casal:</span>
        <span style="color: black; font-size: 14px;">${body.coupleName}</span>
      </span>

      <span>
        <span style="color: black; font-weight: 500; font-size: 16px;">Data de criação:</span> 
        <span style="color: black; font-size: 14px;">${dayjs().format("DD/MM/YYYY")}</span>
      </span>

      <p>Você pode visualizar os detalhes da sua geração no painel do nosso site, basta acessar o link abaixo:</p>
      <a href="http://localhost:3000/dashboard">Acessar painel</a>
    `,
  });
});
