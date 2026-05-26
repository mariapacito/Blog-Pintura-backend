import express from "express";
import dotenv from "dotenv";
import { auth } from "./lib/auth.js";
import { toNodeHandler } from "better-auth/node";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

app.use(express.json());

app.all("/api/auth/*path", toNodeHandler(auth));

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.get("/", (req, res) => {
  res.json({
    message: "🚀 MinURL API rodando!",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      docs: "/api/docs",
    },
  });
});

app.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`);
  console.log(`Auth disponível em http://localhost:${PORT}/api/auth`);
});