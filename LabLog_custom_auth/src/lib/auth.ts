import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, createAccessControl, twoFactor } from "better-auth/plugins";
import { Resend } from "resend";
import { prisma } from "./prisma";
// If your Prisma file is located elsewhere, you can change the path
// resend for email sending
const resend = new Resend("re_AgHA56Fs_6oYqbB4JYAf9QcYeB7VtT3hF");
const statement = {
  user: ["create", "read", "update", "delete"],
  equipment: ["create", "read", "update", "delete"],
} as const;
const ac = createAccessControl(statement);

export const adminRole = ac.newRole({
  user: ["create", "read", "update", "delete"],
  equipment: ["create", "read", "update", "delete"],
});
export const userRole = ac.newRole({
  equipment: ["read", "update"],
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  appName: "Lab Log",

  trustedOrigins: [process.env.FRONTEND_URL!],
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      redirectURI: `${process.env.FRONTEND_URL}/api/auth/callback/github`,
    },
  },
  plugins: [
    twoFactor({
      otpOptions: {
        period: 2,
        async sendOTP({ user, otp }, ctx) {
          // send otp to user
          console.log(user, otp);
          await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: user.email,
            subject: "Two factor authentication ",
            html: `<p>Your OTP is <b>${otp}</b> LabLog</p>`,
          });
        },
      },
      skipVerificationOnEnable: true,
    }),
    admin({
      adminRoles: ["admin", "user"],
      defaultRole: "user",
      roles: {
        admin: adminRole,
        user: userRole,
      },
    }),
  ],
});
