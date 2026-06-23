// src/controllers/plan.controller.js
import * as PlanModel from "../models/plan.model.js";

// GET /api/plans
export async function listar(req, res) {
  const planos = await PlanModel.listarPlanos();
  return res.json(planos);
}

// GET /api/plans/:id
export async function buscar(req, res) {
  const id = req.params.id;
  const plano = await PlanModel.buscarPlanoPorId(id);
  if (!plano) {
    return res.status(404).json({ error: "Plano não encontrado." });
  }
  return res.json(plano);
}

// POST /api/plans
export async function criar(req, res) {
  const { name, price, maxLinks, maxClicks } = req.body;

  if (!name || price == null || maxLinks == null || maxClicks == null) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  const plano = await PlanModel.criarPlano({
    name,
    price,
    maxLinks,
    maxClicks,
  });
  return res.status(201).json(plano);
}

// PUT /api/plans/:id
export async function atualizar(req, res) {
  const id = req.params.id;
  const { name, price, maxLinks, maxClicks } = req.body;

  const plano = await PlanModel.buscarPlanoPorId(id);
  if (!plano) {
    return res.status(404).json({ error: "Plano não encontrado." });
  }

  const atualizado = await PlanModel.atualizarPlano(id, {
    name,
    price,
    maxLinks,
    maxClicks,
  });
  return res.json(atualizado);
}

// DELETE /api/plans/:id
export async function deletar(req, res) {
  const id = req.params.id;

  const plano = await PlanModel.buscarPlanoPorId(id);
  if (!plano) {
    return res.status(404).json({ error: "Plano não encontrado." });
  }

  await PlanModel.deletarPlano(id);
  return res.status(204).send();
}
