import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import nodemailer from "nodemailer";
import { prisma } from "./prisma";
// For production, replace with your actual SMTP server details.

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASSWORD,
  },
});
export const auth = betterAuth({
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
      // html template for email verification
      const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify your email</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f5; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table width="100%" max-width="520" style="background:#ffffff; border-radius:8px; padding:32px;">
          
          <!-- Logo / App name -->
          <tr>
            <td style="text-align:center; padding-bottom:24px;">
              <h1 style="margin:0; color:#111827;">Prisma Blog</h1>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="color:#374151; font-size:16px; line-height:24px;">
              <p>Hi <strong>${user.name ?? "there"}</strong>,</p>
              <p>
                Thanks for signing up! Please confirm your email address by clicking the button below.
              </p>
            </td>
          </tr>

          <!-- Button -->
          <tr>
            <td align="center" style="padding: 32px 0;">
              <a
                href="${verificationUrl}"
                target="_blank"
                style="
                  background-color:#2563eb;
                  color:#ffffff;
                  padding:14px 28px;
                  text-decoration:none;
                  font-size:16px;
                  border-radius:6px;
                  display:inline-block;
                "
              >
                Verify Email
              </a>
            </td>
          </tr>

          <!-- Fallback link -->
          <tr>
            <td style="color:#6b7280; font-size:14px; line-height:20px;">
              <p>
                If the button doesn’t work, copy and paste this link into your browser:
              </p>
              <p style="word-break: break-all;">
                <a href="${verificationUrl}" style="color:#2563eb;">
                  ${verificationUrl}
                </a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:32px; color:#9ca3af; font-size:12px; text-align:center;">
              <p>
                If you didn’t create an account, you can safely ignore this email.
              </p>
              <p style="margin-top:8px;">
                © ${new Date().getFullYear()} Prisma Blog
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

      const info = await transporter.sendMail({
        from: '"Prisma Blog" <prismablog@gmail.com>',
        to: user.email,
        subject: "Verify your email address",
        text: "Hello world?", // Plain-text version of the message
        html: html, // HTML version of the message
      });

      console.log("Message sent:", info.messageId);
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false,
      },
    },
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [process.env.APP_URL!],
});
