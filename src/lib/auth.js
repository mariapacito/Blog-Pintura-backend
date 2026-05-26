import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", 
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  secret: process.env.BETTER_AUTH_SECRET,

  session: {
    expiresIn: 60 * 60 * 24 * 7, 
    updateAge: 60 * 60 * 24, 
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },

  socialProviders: {
  },
});