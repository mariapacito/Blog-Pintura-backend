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
  try {
    const { name, price, maxLinks, maxClicks } = req.body;

    // Validação de presença
    if (!name || price == null || maxLinks == null || maxClicks == null) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    // Validação de tipo/formato
    const nomeLimpo = String(name).trim();
    const precoNum = Number(price);
    const maxLinksNum = Number(maxLinks);
    const maxClicksNum = Number(maxClicks);

    if (!nomeLimpo) {
      return res.status(400).json({ error: "O nome do plano não pode ser vazio." });
    }

    if (Number.isNaN(precoNum) || precoNum < 0) {
      return res.status(400).json({ error: "O preço deve ser um número válido e não negativo." });
    }

    if (!Number.isInteger(maxLinksNum) || maxLinksNum < 0) {
      return res.status(400).json({ error: "maxLinks deve ser um número inteiro válido e não negativo." });
    }

    if (!Number.isInteger(maxClicksNum) || maxClicksNum < 0) {
      return res.status(400).json({ error: "maxClicks deve ser um número inteiro válido e não negativo." });
    }

    const plano = await PlanModel.criarPlano({
      name: nomeLimpo,
      price: precoNum,
      maxLinks: maxLinksNum,
      maxClicks: maxClicksNum,
    });

    return res.status(201).json(plano);
  } catch (error) {
    console.error("Erro ao criar plano:", error);

    // Caso exista uma constraint de unicidade (ex: nome único)
    if (error.code === "P2002") {
      return res.status(409).json({ error: "Já existe um plano com esse nome." });
    }

    return res.status(500).json({ error: "Erro interno ao criar o plano." });
  }
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