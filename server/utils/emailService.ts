import nodemailer from "nodemailer";

const { mailHost, mailPort, mailUser, mailPass } = useRuntimeConfig();

const transporter = nodemailer.createTransport({
  host: mailHost,
  port: Number(mailPort),
  auth: { user: mailUser, pass: mailPass },
});

export const sendEmail = async (options: any) => {
  const defaultSender = { name: "Equipe LoveSpot", email: mailUser };

  const mailOptions = {
    from: `${defaultSender.name} <${defaultSender.email}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
};
