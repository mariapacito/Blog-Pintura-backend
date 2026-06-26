import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import * as PostController from "../controllers/post.controller.js";

const router = Router();

router.get("/", requireAuth, PostController.listar);
router.get("/:id", PostController.buscar);
router.post("/", requireAuth, PostController.criar);
router.put("/:id", requireAuth, PostController.atualizar);
router.delete("/:id", requireAuth, PostController.deletar);

export default router;
