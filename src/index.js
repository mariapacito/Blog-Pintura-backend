// src/index.js - Versão organizada
import express from "express";
import dotenv from "dotenv";

// Configuração inicial
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

// Middleware global
app.use(express.json());

// Rotas de autenticação do Better Auth
// Isso cria todas as rotas automaticamente!
app.all("/api/auth/*path", toNodeHandler(auth));

// Health check (Exatamente como o professor pediu)
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// Rota de teste
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

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`);
  console.log(`Auth disponível em http://localhost:${PORT}/api/auth`);
});