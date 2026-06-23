import { Router } from "express";
import * as PlanController from "../controllers/plan.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", PlanController.listar);
router.get("/:id", PlanController.buscar);
router.post("/", requireAuth, PlanController.criar);
router.put("/:id", requireAuth, PlanController.atualizar);
router.delete("/:id", requireAuth, PlanController.deletar);

export default router;