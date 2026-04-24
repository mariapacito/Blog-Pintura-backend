// src/lib/auth.js
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";

export const auth = betterAuth({
  // Adapter para o banco de dados
  database: prismaAdapter(prisma, {
    provider: "postgresql", // ou "mysql", "sqlite", etc.
  }),

  // Configurações de email (opcional)
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  // Configurações de segurança
  secret: process.env.BETTER_AUTH_SECRET,

  // Configurações de sessão
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 dias
    updateAge: 60 * 60 * 24, // 1 dia
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutos
    },
  },

  // Provedores OAuth (opcional)
  socialProviders: {
    // github: {
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // },
  },
});