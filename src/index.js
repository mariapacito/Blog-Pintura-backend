import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { auth } from "./lib/auth.js";
import { toNodeHandler } from "better-auth/node";
import { requireAuth } from "./middleware/auth.js";
import planRoutes from "./routes/plan.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000", // porta do Next.js
  credentials: true,
}));

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

app.get("/api/me", requireAuth, (req, res) => {
  res.json({
    message: "Bem-vindo ao seu perfil!",
    user: req.user,
  });
});

app.use("/api/plans", planRoutes);