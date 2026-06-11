// src/routes/urlRoutes.js
import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { createShortUrl } from "../controllers/urlController.js";

const router = Router();

// Aplicamos o middleware apenas nas rotas que precisam de login
router.post("/create", requireAuth, createShortUrl);

export default router;