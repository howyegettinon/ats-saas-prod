import nodemailer from "nodemailer";
import { SES } from "aws-sdk";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const ses = new SES();

export async function sendAuthEmail({ email, token }: { email: string; token: string }) {
  try {
    // Try Nodemailer first
    await transporter.sendMail({
      from: '"Auth" <auth@yourdomain.com>',
      to: email,
      subject: "Verify your account",
      html: `<p>Please verify your account using this token: ${token}</p>`,
    });
  } catch (error) {
    // Fallback to SES if Nodemailer fails
    await ses.sendEmail({
      Destination: { ToAddresses: [email] },
      Message: {
        Body: {
          Html: {
            Data: `Please verify your account using this token: ${token}`,
          },
        },
        Subject: { Data: "Verify your account" },
      },
      Source: "Auth <auth@yourdomain.com>",
    }).promise();
  }
}
